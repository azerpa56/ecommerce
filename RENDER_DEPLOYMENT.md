# Despliegue en Render

Este proyecto está configurado para desplegarse automáticamente en Render usando el archivo `render.yaml`.

## Configuración Inicial en Render

### 1. Conecta tu repositorio de GitHub
- Ve a [Render Dashboard](https://dashboard.render.com/)
- Haz clic en "New +" → "Blueprint"
- Conecta tu repositorio `azerpa56/ecommerce`
- Render detectará automáticamente el archivo `render.yaml`

### 2. Configura las Variables de Entorno

Después de crear el servicio, ve a **Environment** y configura estas variables:

#### Base de Datos (Obligatorio)
```
SPRING_DATASOURCE_URL=jdbc:postgresql://ep-rough-cherry-a5b8gsg2-pooler.us-east-2.aws.neon.tech/gorazerdb?sslmode=require&channelBinding=require
SPRING_DATASOURCE_USERNAME=gorazerdb_owner
SPRING_DATASOURCE_PASSWORD=tLXnVoPKUc57
```

#### Email (Requerido para funcionalidades de email)
```
SPRING_MAIL_USERNAME=tu-email@gmail.com
SPRING_MAIL_PASSWORD=tu-password-de-aplicacion-gmail
```

Para obtener la contraseña de aplicación de Gmail:
1. Ve a tu cuenta de Google → Seguridad
2. Activa la verificación en 2 pasos
3. Busca "Contraseñas de aplicaciones"
4. Genera una nueva para "Correo"

#### Stripe (Para pagos)
```
STRIPE_API_KEY=tu_clave_stripe_aqui
```

#### NewsAPI (Para noticias)
```
NEWSAPI_KEY=4aac32271a424df4b67ae71207b2cc48
```

#### JWT Secret (Se genera automáticamente, pero puedes personalizarlo)
```
APP_JWT_SECRET=TuClaveSecretaSuperSeguraYLarga123456789
```

### 3. Estructura del Proyecto

El archivo `render.yaml` está configurado con:
- **Root Directory**: `ecommerceGorazer` (directorio del backend)
- **Build Command**: `./mvnw clean install -DskipTests`
- **Start Command**: `java -jar target/ecommerceGorazer-0.0.1-SNAPSHOT.jar`
- **Java Version**: 17
- **Server Port**: 10000 (puerto estándar de Render)

### 4. Despliegue

Una vez configurado:
1. Render iniciará el build automáticamente
2. El proceso de build puede tomar 5-10 minutos la primera vez
3. Una vez desplegado, tu API estará disponible en: `https://ecommerce-gorazer-backend.onrender.com`

### 5. CORS Configuration

Asegúrate de que tu backend permita solicitudes desde tu frontend. En tu configuración de Spring Security, agrega:

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList(
        "http://localhost:3000",
        "https://tu-frontend.vercel.app" // O tu dominio de frontend
    ));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

### 6. Troubleshooting

#### Error: "Root directory does not exist"
- Verifica que el `rootDir` en `render.yaml` sea exactamente `ecommerceGorazer`
- Asegúrate de que el directorio esté en tu repositorio de GitHub

#### Error de Build
- Revisa los logs en Render Dashboard → tu servicio → Logs
- Verifica que Java 17 esté configurado correctamente
- Asegúrate de que todas las dependencias en `pom.xml` sean accesibles

#### Error de Base de Datos
- Verifica que las credenciales de PostgreSQL sean correctas
- Asegura que la base de datos en Neon esté activa y accesible desde internet

#### La aplicación se detiene después del despliegue
- Revisa los logs para errores de conexión a la base de datos
- Verifica que todas las variables de entorno estén configuradas
- Asegúrate de que el puerto sea 10000 (SERVER_PORT)

### 7. Plan Free de Render

El plan free tiene estas limitaciones:
- El servicio se "duerme" después de 15 minutos de inactividad
- La primera solicitud después de dormir puede tomar 30-60 segundos
- 750 horas de ejecución por mes (suficiente para un servicio)

### 8. Actualizar el Despliegue

Render se despliega automáticamente cuando haces push a la rama `main`:
```bash
git add .
git commit -m "Actualización del backend"
git push origin main
```

### 9. Ver Logs en Tiempo Real

```bash
# Desde Render Dashboard → tu servicio → Logs
# O usa la Render CLI:
render logs -s ecommerce-gorazer-backend --tail
```

## Recursos Adicionales

- [Documentación de Render](https://render.com/docs)
- [Render Blueprint Spec](https://render.com/docs/blueprint-spec)
- [Spring Boot en Render](https://render.com/docs/deploy-spring-boot)
