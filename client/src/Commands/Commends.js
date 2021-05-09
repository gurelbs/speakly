const googleSearch = text => {
    let words = text.split(' ')
    words = words.splice(2,words.length).join(' ')
    return window.open(`https://www.google.com/search?q=${words}`)
}
const wikiSearch = text => {
    let words = text.split(' ')
    words = words.splice(2,words.length).join(' ')
    return window.open(`https://he.wikipedia.org/wiki/${words}`)
}
const youtubeSearch = text => {
    let words = text.split(' ')
    words = words.splice(2,words.length).join(' ')
    return window.open(`https://www.youtube.com/results?search_query=${words}`)
}
const playRadio = () => window.open('https://radio.coolsite.co.il/radio.php?radio=8')
module.exports = {
  googleSearch,
  wikiSearch,
  playRadio,
  youtubeSearch
}