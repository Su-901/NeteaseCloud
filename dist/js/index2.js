$.ajax({
      url: "../json/index.json",
      success: function (arr) {
        console.log($('.product-content1 ul').html());
        var str = ` `;
        for (var i = 0; i < arr.length; i++) {
          str += `<li>
                     <a href="">
                         <img src="${arr[i].img}" alt="" />
                    </a>
                    <span>${arr[i].name}</span>
                    <p>${arr[i].price}</p>
                 </li>`
    
           
        }
$('.product-content1 ul').html(str) 
    //     $(str).appendTo($(".product-content1 ul"));
      }, 
      error: function (msg) {
        console.log(msg);}
      })