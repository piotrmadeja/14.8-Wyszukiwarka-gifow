App = React.createClass ({
  
  getInitialState() {
    return {
      loading: false,
      searchingText: '',
      gif: {}
    };
  },

  handleSearch: function(searchingText) {  //pobiera na wejsciu wpisany tekst
    this.setState({
      loading: true  // zaczal sie proces ladowania
    });
    this.getGif(searchingText, function(gif) {  //Rozpoczyna pobieranie gifa
      this.setState({  //Na zakonczene pobierania:
        loading: false,  //przestaje sygnalizowac ladowanie
        gif: gif,  //ustawia nowego gifa z wyniku pobierania
        searchingText: searchingText  //ustawia nowy stan dla wyszukiwanego tekstu
      });
    }.bind(this));
  },
  
  getGif: function(searchingText, callback) {  // dwa parametry -> wpisany tekst i funkcja ktora ma sie wykonac po pobraniu
    var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  //Skonstruowanie adresu URL dla API Giphy
    var xhr = new XMLHttpRequest();  //Wywołanie całej sekwencji tworzenia zapytaniaXHR do serwera + wysłanie
    xhr.open('GET', url);
    xhr.onload = function() {
        if (xhr.status === 200) {
           var data = JSON.parse(xhr.responseText).data;
            var gif = {  
                url: data.fixed_width_downsampled_url,
                sourceUrl: data.url
            };
            callback(gif);
        }
    };
    xhr.send();
  },

  render: function() {

    var styles = {
      margin: '0 auto',
      textAlign: 'center',
      width: '90%'
    };

  return (
    <div style={styles}>
        <h1>Wyszukiwarka GIFów</h1>
        <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciśnij enter aby pobrać kolejne gify.</p>
      <Search
        onSearch={this.handleSearch} 
      />
      <Gif
        loading={this.state.loading}
        url={this.state.gif.url}
        sourceUrl={this.state.gif.sourceUrl} 
      />
    </div>
    );
  }
});