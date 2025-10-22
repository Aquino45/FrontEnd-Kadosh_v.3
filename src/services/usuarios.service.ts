import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AUTH_API_URL } from '../environments/api';

// Base común de tus respuestas
type ApiBase = {
  success: boolean;
  message?: string; // ← tu backend lo envía en éxito y error
};

// /login
export type LoginResponse = ApiBase & {
  token?: string;
  user?: {
    id: string;
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    telefono?: string | null;
    activo: boolean;
    rol?: string;         // si lo incluyes en login
    imagen_url?: string;  // si lo incluyes en login
  };
};

// /me
export type MeResponse = ApiBase & {
  data?: {
    nombre: string;
    apellido: string;
    correo: string;
    rol: string | null;
    imagenUrl: string | null;
  };
};

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient) {}

  setToken(t: string) { localStorage.setItem(this.TOKEN_KEY, t); }
  getToken(): string | null { return localStorage.getItem(this.TOKEN_KEY); }
  clearToken() { localStorage.removeItem(this.TOKEN_KEY); }

  async login(dni: string, password: string): Promise<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const resp = await firstValueFrom(
      this.http.post<LoginResponse>(`${AUTH_API_URL}/login`, { dni, password }, { headers })
    );
    if (resp?.success && resp?.token) this.setToken(resp.token);
    return resp;
  }

  async me(): Promise<MeResponse> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
    return await firstValueFrom(
      this.http.get<MeResponse>(`${AUTH_API_URL}/me`, { headers })
    );
  }
}
