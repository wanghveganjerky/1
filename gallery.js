var imageIndex = 0;
var imagesArray = [];

$.ajax({
    url: 'https://api.airtable.com/v0/appsIMERc2HzI8dmm/Table%201?maxRecords=20&view=Grid%20view',
    headers: {
        'Authorization': 'Bearer keyh3uOsJOXwcWjYe'
    },
    success: (response)=>{//wait function,preload to check if success
        const {records} = response;
        console.log(records);
        let imagesIndex = 0;
        records.forEach(record=>{
            if(!record||!record.fields||!record.fields.image) return;

            const {title,image,medium} = record.fields;
            const author = record.fields['designer/ author'];

            const div = $(`
                <div class="record">
                    <h2>${title}</h2>
                    <h4> ${author} ; ${medium&&medium.length>0?medium[0]:'None'}</h4>
                    <div class="record-images"></div>
                </div>
            `);

            if(image)
                image.forEach(img=>{
                    imagesArray.push(img.url);
                    $(`<div data-index="${imagesIndex++}"  class="record-image"><img src="${img.url}" width="100%"></img></div>`).appendTo(div.children('.record-images'));
                });

            $(div).appendTo($('.images-container'));
        });
        $('.record-image').click(imageClick)
    }
})









function imageClick(){
    imageIndex=$(this).attr('data-index');
    $(".modal-images").show()
    updateModalImage();
}

function updateModalImage(){
    $('.modal-image img:eq(0)').attr('src',imagesArray[imageIndex]);
}

$('.modal-image').click(function(){
    $(".modal-images").hide()
})

$('#modal-next').click(function(){
    if(imageIndex<imagesArray.length-1){
        imageIndex++;
        updateModalImage();
    }
});


$('#modal-pre').click(function(){
    if(imageIndex>0){
        imageIndex--;
        updateModalImage();
    }
});


