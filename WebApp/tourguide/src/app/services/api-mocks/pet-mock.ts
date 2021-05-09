import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  Configuration,
  Pet,
  PetServiceInterface,
} from '../../api';

export class PetMock implements PetServiceInterface {
  defaultHeaders!: HttpHeaders;
  configuration!: Configuration;
  addPet(pet: Pet, extraHttpRequestParams?: any): Observable<Pet> {
    throw new Error('Method not implemented.');
  }
  deletePet(
    petId: number,
    apiKey?: string,
    extraHttpRequestParams?: any
    // eslint-disable-next-line @typescript-eslint/ban-types
  ): Observable<{}> {
    throw new Error('Method not implemented.');
  }
  findPetsByStatus(
    status?: 'available' | 'pending' | 'sold',
    extraHttpRequestParams?: any
  ): Observable<Pet[]> {
    throw new Error('Method not implemented.');
  }
  findPetsByTags(
    tags?: string[],
    extraHttpRequestParams?: any
  ): Observable<Pet[]> {
    throw new Error('Method not implemented.');
  }
  getPetById(petId: number, extraHttpRequestParams?: any): Observable<Pet> {
    throw new Error('Method not implemented.');
  }
  updatePet(pet: Pet, extraHttpRequestParams?: any): Observable<Pet> {
    throw new Error('Method not implemented.');
  }
  updatePetWithForm(
    petId: number,
    name?: string,
    status?: string,
    extraHttpRequestParams?: any
    // eslint-disable-next-line @typescript-eslint/ban-types
  ): Observable<{}> {
    throw new Error('Method not implemented.');
  }
  uploadFile(
    petId: number,
    additionalMetadata?: string,
    body?: Blob,
    extraHttpRequestParams?: any
  ): Observable<ApiResponse> {
    throw new Error('Method not implemented.');
  }
}
