import { Observable } from 'rxjs';

export interface ModelService {

    delete(id: number): Observable<any>;

}
