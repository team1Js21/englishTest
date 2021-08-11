import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Admin } from 'src/app/core/models/admin.model';
import { Hr } from 'src/app/core/models/hr.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersAdminService {
  constructor(private http: HttpClient) {}

  getUnassignedTests(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${environment.api_URL}/api/test/unassignedToCouch`);
    
  }

  getUsers(): Observable<Hr[]> {
    return this.http.get<Hr[]>(`${environment.api_URL}/api/user?Page=0&Skip=10&Take=10`);
  }

  postAssignCheck(testId: string, couchId: string) {
    return this.http
      .put<any>(
        `${environment.api_URL}/assignCouch?TestId=${testId}&CouchId=${couchId}`,
        {}
      )
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        })
      );
  }
}
