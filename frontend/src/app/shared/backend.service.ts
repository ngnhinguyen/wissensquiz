import { Injectable } from '@angular/core';
import { Member } from '../../../../backend/member';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  apiURL = 'http://localhost:3002'

  constructor() { }

  async getAll(): Promise<Member[]> {
    const response = await fetch(`${this.apiURL}/members`, {
      headers: this.getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  delete(id: string): Promise<void> {
    return fetch(`${this.apiURL}/members/${id}`, {
      method: 'DELETE',
    }).then(res => {
      if (!res.ok) {
        throw new Error('Failed to delete member');
      }
    });
  }
  async getOne(id: string): Promise<Member> {
    let response = await fetch(this.apiURL + '/members/' + id);
    let member = await response.json();
    console.log('member in service (getOne) : ', member)
    return member;
  }
  async update(id: string, updateData: Member): Promise<Member> {
    let response = await fetch(this.apiURL + '/members/' + id, {
      method: "PUT",
      body: JSON.stringify(updateData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let member = await response.json();
    console.log('member in service (update) : ', member)
    return member;
  }
  async deleteOne(id: string): Promise<{message: string}> {
    let response = await fetch(this.apiURL + '/members/' + id, {
      method: "DELETE"
    });
    let message = await response.json();
    console.log('message in service (deleteOne) : ', message)
    return message;
  }
  async create(newData: Member): Promise<Member> {
    let response = await fetch(this.apiURL + '/members', {
      method: "POST",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let member = await response.json();
    console.log('member in service (create) : ', member)
    return member;
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    let response = await fetch(`${this.apiURL}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json"
      },
    });

    let result = await response.json();
    console.log('Token received:', result.token);

    if (result.token) {
      localStorage.setItem('authToken', result.token); // Speichert JWT-Token
    }

    return result;
  }

  // ✅ LOGOUT (TOKEN LÖSCHEN)
  logout(): void {
    localStorage.removeItem('authToken');
    console.log('User logged out.');
  }

  // ✅ HILFSFUNKTION: AUTHORIZATION HEADER HINZUFÜGEN
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('authToken');
    return token ? { Authorization:  token } : {};
  }

}