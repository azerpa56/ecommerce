# Configuración de Noticias en Tiempo Real

Esta página muestra noticias de tecnología en tiempo real utilizando APIs externas.

## 🔧 Configuración de NewsAPI

Para mostrar noticias reales:

1. Registrarse en [NewsAPI.org](https://newsapi.org/) (gratis)
2. Obtener tu API Key
3. Reemplazar `YOUR_API_KEY` en `page.jsx` línea ~26

### Alternativas de APIs de Noticias Gratuitas:

#### 1. **NewsAPI** (Recomendada)
- URL: https://newsapi.org/
- Límite gratuito: 100 requests/día
- Cobertura: 150+ países
- Endpoint para tecnología en español:
```javascript
https://newsapi.org/v2/top-headlines?category=technology&language=es&apiKey=YOUR_KEY
```

#### 2. **GNews API**
- URL: https://gnews.io/
- Límite gratuito: 100 requests/día
- Endpoint:
```javascript
https://gnews.io/api/v4/top-headlines?category=technology&lang=es&apikey=YOUR_KEY
```

#### 3. **NewsData.io**
- URL: https://newsdata.io/
- Límite gratuito: 200 requests/día
- Endpoint:
```javascript
https://newsdata.io/api/1/news?category=technology&language=es&apikey=YOUR_KEY
```

#### 4. **The News API**
- URL: https://www.thenewsapi.com/
- Límite gratuito: 100 requests/día
- Endpoint:
```javascript
https://api.thenewsapi.com/v1/news/top?categories=tech&language=es&api_token=YOUR_KEY
```

## 🚀 Mejores Prácticas

### Backend API (Recomendado para Producción)

En lugar de llamar a las APIs desde el frontend, crea un endpoint en tu backend Spring Boot:

```java
@RestController
@RequestMapping("/api/news")
public class NewsController {
    
    @Value("${newsapi.key}")
    private String apiKey;
    
    @GetMapping("/tech")
    public ResponseEntity<List<NewsArticle>> getTechNews() {
        // Llamar a NewsAPI desde el backend
        // Cachear resultados por 1 hora
        // Retornar datos limpios al frontend
    }
}
```

### Variables de Entorno

En tu archivo `.env.local`:
```
NEXT_PUBLIC_NEWS_API_KEY=tu_api_key_aqui
```

En el código:
```javascript
const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY
```

## 📋 Información Mostrada

La página filtra y muestra solo:
- ✅ Título
- ✅ Descripción/Extracto
- ✅ Fecha de publicación
- ✅ Fuente/Autor
- ✅ Imagen principal
- ✅ Enlace al artículo original

## 🎨 Características

- Noticia destacada en la parte superior
- Grid de noticias secundarias
- Loading spinner mientras carga
- Fallback a noticias de ejemplo si falla la API
- Manejo de errores de imágenes rotas
- Diseño responsive
- Enlaces externos abren en nueva pestaña

## 🔄 Actualización Automática

Para actualizar noticias cada 30 minutos, agregar en `useEffect`:

```javascript
useEffect(() => {
  fetchTechNews()
  const interval = setInterval(fetchTechNews, 30 * 60 * 1000)
  return () => clearInterval(interval)
}, [])
```
