# Bitácora de Qilife

Agrega los cambios más recientes al inicio con su fecha, los ajustes de configuración y las pruebas relevantes.

## 2026-11-12

- **Tema.** Se quitó la carga duplicada de Tailwind desde el CDN. El botón Claro/Oscuro usa el CSS compilado y recuerda la elección en el navegador.
- **Chat.** El asistente recibe hasta cuatro intercambios anteriores como contexto. Los errores aparecen junto a la conversación y el botón «Reintentar» vuelve a enviar la misma pregunta en los casos recuperables.
- **Disponibilidad.** Cuando Gemini devuelve un `503`, la API reintenta una vez con una pausa breve. Si persiste la saturación, se agota el tiempo de espera o falla la conexión, prueba el modelo alternativo. Un `429` muestra el aviso de límite de uso sin reintentos automáticos. Los registros incluyen el modelo y el estado HTTP sin guardar las preguntas ni la clave.

### Configuración del chat

- `GEMINI_API_KEY` es obligatoria en el servidor de Vercel. Las variables opcionales `GEMINI_MODEL` y `GEMINI_FALLBACK_MODEL` permiten cambiar los modelos, que por defecto son `gemini-3.8-flash` y `gemini-3.5-flash-lite`.
- `VITE_CHAT_API_URL` permite apuntar la compilación web a otro entorno de prueba. Si no se define, usa la API de Vercel existente.
- Para publicar este cambio, despliega primero la API de Vercel y después la web de GitHub Pages. En producción, comprueba una pregunta y una repregunta para verificar el acceso a Gemini y el uso del historial.

### Verificación

- `npm run build` completó correctamente. En Chrome se comprobó el cambio de tema con el sistema en modo oscuro y que la elección se conserva al recargar.
- Con Gemini simulado se verificaron el modelo alternativo, la distinción entre saturación y cuota, el reintento sin duplicar la pregunta y el contexto en las repreguntas.
