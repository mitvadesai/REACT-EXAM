import axios from "axios";

const uploadImage = async(file) => {
    let data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "products");
        data.append("cloud_name", "dzsir995d");

        let result = await axios.post('https://api.cloudinary.com/v1_1/dzsir995d/image/upload', data)
        return result.data.url;
}

export default uploadImage;