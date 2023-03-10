{
    //method to submit the form data for new posts using ajax
    let createPost=function(){
        let newPostForm =$('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/post/create',
                data:newPostForm.serialize(),
                success:function(data){
                    let newPost=newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($('.delete-post-button',newPost));
                },error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
     //method to create post in DOM
     let newPostDom=function(post){
        return $(`<li id="post-${post._id}">
        <p>
           <small>
                <a class="delete-post-button" href="/post/destroy/${post._id}">X</a>
            </small>
            
            ${post.content} 
            <br>
            <small>
                ${post.user.name}
            </small>
        </p>    
            <div class="post-comments">
                
                    <form action="/comments/create" method="POST">
                        <input type="text" name="content" placeholder="comment here.." required>
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Add comment">
    
                    </form>
                
                
                <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">
         
                    </ul>
                </div>
            </div>
                  
    </li>`)
     }
    
     //method to delete a post from DOM
     let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
           e.preventDefault();

           $.ajax({
              type:'get',
              url:$(deleteLink).prop('href'),
              success:function(data){
                $('#post-${data.data.post._id}').remove();
              },error:function(error){
                 console.log(error.responseText);
              }
            });
        })
     }

    createPost();
}