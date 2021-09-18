class Downloader {
  async download_file(fileUrl, fileName) {
    let a = document.createElement("a");
    a.href = await this.toDataURL(fileUrl);
    a.download = fileName;
    a.click();
  }
  
  toDataURL(url) {
    return fetch(url).then((response) => {
        return response.blob();
    }).then(blob => {
        return URL.createObjectURL(blob);
    });
  }
}

export default Downloader;
