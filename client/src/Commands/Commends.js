const googleSearch = text => {
    let words = text.split(' ')
    words = words.splice(2,words.length).join(' ')
    console.log(words);
    window.open(`https://www.google.com/search?q=${words}`)
}

module.exports = {
  googleSearch
}