export const fileUpload = async( file ) => {

    if ( !file ) throw new Error("No tenemos ningun archivo"); 

    //este lo obtenemos en configuracion de nuestra cuenta en cloudinary
    const productEnvironmentCloudName = 'dhr5brccq'; 

    //const cloudUrl = 'https://api.cloudinary.com/v1_1/journal/upload';
    
    const cloudUrl = `https://api.cloudinary.com/v1_1/${productEnvironmentCloudName}/upload`;
    console.log("cloudURL:",cloudUrl); 


    const formData = new FormData();

    //esta es la carpeta...
    formData.append('upload_preset','Lucho2'); 
    formData.append('file',file);

    try {

        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        })

        console.log("Respuesta de la subida:", resp);
        
        //si algo salio mal mando un error
        if ( !resp.ok ) throw new Error("No se pudo subir la imagen"); 

        //en este punto sabemos que salio bien y vamos a lleva a json la respuesta
        const cloudResp = await resp.json();

        return cloudResp.secure_url;


    } catch (error) {
        console.log( error.message );
        throw new Error( error.message )
    }

}