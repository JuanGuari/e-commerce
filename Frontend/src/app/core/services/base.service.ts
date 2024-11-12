import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MapperService } from '../mappers/mapper.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private _http = inject(HttpClient);
  _mapper = inject(MapperService);
    
  get http(): HttpClient {
      return this._http;
  }

  get url(): string {
      return environment.API_URL;
  }

}
