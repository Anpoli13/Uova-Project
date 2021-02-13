const spaceID = "yh73xk2rt5r8";
const environmentID = "master";
const accessToken = "SUcUjLwVbmAAmgeig_yNe2borIBDybpqf41FEZPWZSE";

const url = `https://cdn.contentful.com/spaces/${spaceID}/environments/${environmentID}/entries?access_token=${accessToken}&order=fields.order&content_type=menuItem`;

const sectionTag = document.querySelector("section.grid")

const grabData = function () {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            //store assets somewhere
            const assets = data.includes.Asset;

            // turn our contentful data into something more useful
            return data.items.map(item => {

                let imageUrl = "image1.jpg";
                const imageID = item.fields.image.sys.id;

                const imageData = assets.find(asset => {
                    return asset.sys.id == imageID;
                })

                if (imageData) {
                    imageUrl = imageData.fields.file.url;
                }

                item.fields.image = imageUrl;
                return item.fields;
        });
    })

}

// run this grabData function on load

grabData().then(data => {
    // in here do something with the returned data
    console.log(data);

    // remove the loader
    sectionTag.innerHTML = "";

    data.forEach(item => {
        sectionTag.innerHTML = sectionTag.innerHTML + `
            <div class="item">

                <img src="http:${item.image}">

                <div class="title">
                    <h2>${item.title}</h2>
                    <p>${item.price}</p>
                </div>

                <p>${item.description}</p>
                
            </div>
        `
    })
});