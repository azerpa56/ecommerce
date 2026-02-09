# Guía de Despliegue en Vercel

## ✅ Configuración Lista

Tu proyecto está configurado correctamente para desplegar en Vercel. Aquí está lo que se ha configurado:

### 📁 Archivos Configurados
- ✅ `vercel.json` - Configuración de Vercel
- ✅ `.env.example` - Template de variables de entorno
- ✅ `.env.local` - Variables locales (desarrollo)
- ✅ `app/config/api.js` - Configuración dinámica de API
- ✅ `.gitignore` - Actualizado para Next.js

### 🚀 Pasos para Desplegar

#### 1. Commit y Push de cambios
```bash
git add .
git commit -m "Configure Vercel deployment with dynamic API endpoints"
git push
```

#### 2. Configurar en Vercel Dashboard

**Opción A: Usando Root Directory (Recomendado)**
1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. **Settings** → **General**
3. En **Root Directory**, haz clic en **Edit**
4. Escribe: `frontend`
5. Haz clic en **Save**

**Opción B: Usar vercel.json**
- El archivo ya está configurado, solo necesitas hacer redeploy

#### 3. Configurar Variables de Entorno en Vercel

**IMPORTANTE**: Debes configurar la URL de tu API backend

1. Ve a **Settings** → **Environment Variables**
2. Agrega la siguiente variable:
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: https://tu-api-backend.com
   ```
   (Reemplaza con la URL real de tu API Java desplegada)

3. Selecciona los ambientes: Production, Preview, Development
4. Haz clic en **Save**

#### 4. Redeploy

1. Ve a **Deployments**
2. Haz clic en el botón de menú (`...`) del último deployment
3. Selecciona **Redeploy**

### 🔧 Configuración del Backend

Para que el frontend funcione correctamente, tu API Java (Spring Boot) debe:

1. **Estar desplegada y accesible** (puedes usar Railway, Render, AWS, etc.)
2. **Configurar CORS** para permitir peticiones desde Vercel:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://tu-app.vercel.app", "http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

### 📝 Variables de Entorno Disponibles

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | URL del backend API | `https://api.tuapp.com` |

### ✅ Checklist Pre-Despliegue

- [ ] Backend API desplegado y funcionando
- [ ] CORS configurado en el backend
- [ ] Variable `NEXT_PUBLIC_API_URL` configurada en Vercel
- [ ] Commits pusheados a GitHub
- [ ] Root Directory configurado en Vercel (`frontend`)
- [ ] Primer deployment ejecutado

### 🐛 Solución de Problemas

**Error: "There was a permanent problem cloning the repo"**
- ✅ Resuelto: El `vercel.json` ahora apunta correctamente a la carpeta `frontend`

**Error: "Cannot find module 'apiEndPoint.json'"**
- ✅ Resuelto: Ahora se usa `api.js` con configuración dinámica

**Error de CORS en producción**
- Verifica que el backend tiene configurado CORS para el dominio de Vercel
- Agrega `https://tu-app.vercel.app` a los orígenes permitidos

**API no responde**
- Verifica que `NEXT_PUBLIC_API_URL` esté configurada correctamente
- Verifica que el backend esté activo y respondiendo

### 📚 Recursos

- [Documentación de Vercel](https://vercel.com/docs)
- [Variables de Entorno en Next.js](https://nextjs.org/docs/basic-features/environment-variables)
- [Configuración de CORS en Spring Boot](https://spring.io/guides/gs/rest-service-cors/)

---

**Nota**: No olvides reemplazar `https://tu-api-backend.com` con la URL real de tu API desplegada.
