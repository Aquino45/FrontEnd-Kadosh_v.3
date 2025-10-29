// src/app/services/usuarios.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AUTH_API_URL, USUARIOS_API_URL } from '../environments/api'; // 👈 asegúrate de tener ambos

// ---------- Tipos base que tu backend ya devuelve ----------
type ApiBase = {
  success: boolean;
  message?: string; // tu back envía "message" en éxito y error
};

// ---------- /auth/login ----------
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
    rol?: string;
    imagen_url?: string;
  };
};

// ---------- /auth/me ----------
export type MeResponse = ApiBase & {
  data?: {
    nombre: string;
    apellido: string;
    correo: string;
    rol: string | null;
    imagenUrl: string | null;
  };
};

// ---------- /auth/register ----------
export type RegisterRequest = {
  nombre: string;
  apellido: string;
  email?: string | null;
  telefono: string;
  dni: string;
  password: string;
  imagenUrl?: string | null; // tu controlador espera "imagenUrl"
};


export type RegisterResponse = ApiBase;

// ---------- /usuarios/clientes (DTO del back) ----------
export interface ClienteListItemDTO {
  usuarioId: string;
  nombre: string | null;
  apellido: string | null;
  email: string | null;
  telefono: string | null;
  dni: string | null;
  imagenUrl: string | null;
  createdAt: string; // ISO string (LocalDateTime -> String)
}

// ====== NUEVO TYPE (colócalo justo arriba del método listClientes) ======
type ClientesWrapped = {
  success: boolean;
  message?: string;
  data?: ClienteListItemDTO[];
};

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient) {}

  // ----- Token helpers -----
  setToken(token: string) { localStorage.setItem(this.TOKEN_KEY, token); }
  getToken(): string | null { return localStorage.getItem(this.TOKEN_KEY); }
  clearToken() { localStorage.removeItem(this.TOKEN_KEY); }
  isLoggedIn(): boolean { return !!this.getToken(); }

  // Headers
  private jsonHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  private authHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }

  // ----- Auth: LOGIN -----
  async login(dni: string, password: string): Promise<LoginResponse> {
    const url = `${AUTH_API_URL}/login`;
    const body = { dni, password };
    const resp = await firstValueFrom(
      this.http.post<LoginResponse>(url, body, { headers: this.jsonHeaders() })
    );
    if (resp?.success && resp?.token) this.setToken(resp.token);
    return resp;
  }

  // ----- Auth: REGISTER -----
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const url = `${AUTH_API_URL}/register`;
    return await firstValueFrom(
      this.http.post<RegisterResponse>(url, data, { headers: this.jsonHeaders() })
    );
  }

  

  // ----- Auth: ME (perfil con token) -----
  async me(): Promise<MeResponse> {
    const url = `${AUTH_API_URL}/me`;
    return await firstValueFrom(
      this.http.get<MeResponse>(url, { headers: this.authHeaders() })
    );
  }

  // ====== NUEVO: /usuarios/clientes ======
  // Devuelve el array plano de ClienteListItemDTO
   // ✅ Ajustado: acepta array o {data:[...]}
  async listClientes(): Promise<ClienteListItemDTO[]> {
    const url = `${USUARIOS_API_URL}/clientes`;

    const resp = await firstValueFrom(
      this.http.get<ClienteListItemDTO[] | ClientesWrapped>(url, { headers: this.authHeaders() })
    );

    if (Array.isArray(resp)) return resp;
    if (resp && 'data' in resp && Array.isArray(resp.data)) return resp.data as ClienteListItemDTO[];

    // si vino un error “envolto”
    const msg = (resp as any)?.message || 'Respuesta inválida del servidor.';
    throw Object.assign(new Error(msg), { status: 200 }); // status dummy si vino 200 con shape inesperado
  }

  // ----- Logout -----
  logout() { this.clearToken(); }
}
