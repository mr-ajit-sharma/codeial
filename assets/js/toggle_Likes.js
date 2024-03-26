// CHANGE:create a class to toggle like when a link is clicked using AJAX
class ToggleLike {
    constructor(toggleElement) {
        this.toggler = toggleElement;
        this.toggleLike();
    }
    toggleLike(){
        $(this.toggler).click(function(e){
        e.preventDefault();
        let self =this
        
        // this is new way to write ajax which you might studied,it looks like same as promise
            $.ajax({
                type:'Post',
                url:$(self).attr('href')
            })
            .done(function(data){
                let likescount=parseInt($(self).attr('data-likes'))
                connsole.log(likescount)
                if(data.data.deleted==true){
                    likescount-=1;
                }else{
                    likescount+=1;
                }

                $(self).attr('data-likes',likescount)
                $(self).html(`${likescount} Likes`)
            })
            .fail(function(errData){
                console.log('error in completing the request')
            })
    })
}
}