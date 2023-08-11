$(document).ready(function () {
    $('#loginForm').show();
    $('#albumList').hide();
    $('#imageSlider').hide();

    $.getJSON('data.json', function (data) {
        albums = data.albums || [];
        imageNames = data.imageNames || [];
        fetchAlbums();
    });
});

const albums = [];
let imageNames = [];

function login() {
    const email = $('#email').val();
    const password = $('#password').val();

    if (email === 'raghav' && password === 'raghav') {
        $('#loginForm').hide();
        $('#albumList').show();
        fetchAlbums();
    } else {
        alert('Wrong email or password. Please try again.');
    }
}

function showAlbumImages(albumTitle) {
    const album = albums.find(album => album.title === albumTitle);

    if (!album) {
        console.log('Album not found.');
        return;
    }

    const albumImages = imageNames.filter(image => image.albumTitle === albumTitle);

    const imageList = $('#imageList');
    imageList.empty();

    if (albumImages.length === 0) {
        imageList.append('<p>No images available.</p>');
    } else {
        albumImages.forEach(image => {
            imageList.append(`
                <div>
                    <span>${image.imageName}</span>
                    <button onclick="deleteImageName('${album.title}', '${image.imageName}')">Delete</button>
                </div>`
            );
        });
    }

    imageList.append(`
        <input type="text" id="imageName" placeholder="Image">
        <button onclick="addImageName('${album.title}')">Add Image Link</button>
    `);

    $('#albumList').hide();
    $('#createAlbumForm').hide();
    $('#imageSlider').show();
}

function fetchAlbums() {
    albums.push({ title: 'Album 1', description: 'Description 1' });
    albums.push({ title: 'Album 2', description: 'Description 2' });
    refreshAlbumList();
}

function refreshAlbumList() {
    const albumItems = $('#albumItems');
    albumItems.empty();

    albums.forEach(album => {
        albumItems.append(`<li><a href="#" onclick="showAlbumImages('${album.title}')">${album.title}</a> <button onclick="deleteAlbum('${album.title}')">Delete</button></li>`);
    });
}

function goBack() {
    $('#imageSlider').hide();
    $('#albumList').show();
}

function goToLogin() {
    $('#albumList').hide();
    $('#loginForm').show();
}

function createAlbum() {
    const albumTitle = $('#albumTitle').val();
    const albumDescription = $('#albumDescription').val();

    const newAlbum = {
        title: albumTitle,
        description: albumDescription,
    };

    albums.push(newAlbum);
    refreshAlbumList();
    updateDataJson();

    $('#albumTitle').val('');
    $('#albumDescription').val('');

    $('#createAlbumForm').hide();
    $('#albumList').show();
}

function showCreateAlbumForm() {
    $('#albumList').hide();
    $('#imageSlider').hide();
    $('#createAlbumForm').show();
}

function goBackToAlbumList() {
    $('#createAlbumForm').hide();
    $('#albumList').show();
}

function logout() {
    $('#albumList').hide();
    $('#imageSlider').hide();
    $('#createAlbumForm').hide();
    $('#loginForm').show();
}

function deleteAlbum(albumTitle) {
    const albumIndex = albums.findIndex(album => album.title === albumTitle);

    if (albumIndex !== -1) {
        albums.splice(albumIndex, 1);
        refreshAlbumList();
    }
}


function addImageName(albumTitle) {
    const imageName = $('#imageName').val();

    if (imageName) {
        imageNames.push({ albumTitle: albumTitle, imageName: imageName });
        Swal.fire('Success', 'Image added successfully!', 'success');
        refreshImageNameList(albumTitle);
        updateDataJson();
    } else {
        Swal.fire('Error', 'Please enter an image link.', 'error');
    }
}

function deleteImageName(albumTitle, imageName) {
    const indexToRemove = imageNames.findIndex(image => image.albumTitle === albumTitle && image.imageName === imageName);

    if (indexToRemove !== -1) {
        imageNames.splice(indexToRemove, 1);
        Swal.fire('Success', 'Image deleted successfully!', 'success');
        refreshImageNameList(albumTitle);
        updateDataJson();
    } else {
        Swal.fire('Error', 'Image not found.', 'error');
    }
}

function updateDataJson() {
    const data = {
        albums: albums,
        imageNames: imageNames
    };

    $.ajax({
        type: 'POST',
        url: 'update_data.php',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                console.log('Data updated successfully.');
            } else {
                console.log('Data update failed.');
            }
        }
    });
}

function refreshImageNameList(albumTitle) {
    const albumIndex = albums.findIndex(album => album.title === albumTitle);

    if (albumIndex !== -1) {
        const imageList = $('#imageList');
        imageList.empty();

        const albumImages = imageNames.filter(image => image.albumTitle === albumTitle);

        if (albumImages.length === 0) {
            imageList.append('<p>No images available.</p>');
        } else {
            albumImages.forEach(image => {
                imageList.append(`
                    <div>
                        <span>${image.imageName}</span>
                        <button onclick="deleteImageName('${albumTitle}', '${image.imageName}')">Delete</button>
                    </div>`
                );
            });
        }
    }
}
