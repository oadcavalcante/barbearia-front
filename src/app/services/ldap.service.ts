import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserLdap } from '../interfaces/userLdap';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LdapService {
  private ldapDataSubject = new BehaviorSubject<UserLdap[]>(this.loadData() || []);
  ldapData$ = this.ldapDataSubject.asObservable();

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getLdapData(login: string, password: string): Observable<UserLdap[]> {
    return this.http.get<UserLdap[]>(`${this.apiUrl}/auth/ldap`, {
      params: {
        login: login,
        password: password
      }
    });
  }

  setLdapData(data: UserLdap[]): void {
    this.ldapDataSubject.next(data);
    this.saveLdapData(data);
  }

  private saveLdapData(data: UserLdap[]): void {
    sessionStorage.setItem('ldap-data', JSON.stringify(data));
  }

  private loadData(): UserLdap[] {
    // Carrega os dados do localStorage
    const data = sessionStorage.getItem('ldap-data');
    return data ? JSON.parse(data) : [];
  }
}
