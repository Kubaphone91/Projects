import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()

export class SpotifyService{
  private searchUrl: string;
  private redirect_uri: string;
  private client_id = '944c95e1826c415aa7c863824fe88873';
  private client_secret = '41a90b06dccd4be6a9365d3be4e8345d';
  private access_token: string;
  private ArtistUrl: string;
  private AlbumsUrl: string;
  private AlbumUrl: string;
  private encoded = btoa(this.client_id + ':' + this.client_secret);



  constructor(private _http: Http){

  }

  getToken(){
    var params = ('grant_type = client_credentials');

    var headers = new Headers();
    headers.append('Authorization', 'Basic ' + this.encoded);

    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post('https://accounts.spotify.com/api/token', params, { headers: headers })
            .map(res => res.json());
  }

  searchMusic(str: string, type='artist', token: string){
    console.log(this.encoded);
    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type;

    let headers = new Headers();
    headers.append('Authorization', 'Bearer' + token);

    return this._http.get(this.searchUrl, { headers: headers })
            .map((res: Response) => res.json());
  }

  getArtist(id: string, token: string){
    this.ArtistUrl = 'https://api.spotify.com/v1/artists/' + id;
    let headers = new Headers();
    headers.append('Authorization', 'Bearer' + token);

    return this._http.get(this.ArtistUrl, { headers: headers })
            .map((res: Response) => res.json());
  }

  getAlbums(artistId: string, token: string){
    this.AlbumsUrl = 'https://api.spotify.com/v1/artists' + artistId + '/albums/?query=&limit=20';
    let headers = new Headers();
    headers.append('Authorization', 'Bearer' + token);

    return this._http.get(this.AlbumsUrl, { headers: headers})
            .map((res: Response) => res.json());
  }

  getAlbum(id: string, token: string){
    this.AlbumUrl = 'https://api.spotify.com/v1/albums/' + id;
    let headers = new Headers();
    headers.append('Authorization', 'Bearer' + token);

    return this._http.get(this.AlbumUrl, { headers: headers })
            .map((res: Response) => res.json());
  }
}
