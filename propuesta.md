# Propuesta de Servicio

![Imgur](https://i.imgur.com/ADtHOm8.png)

---

## 📌 Descripción de la Solución Integrada

La solución propuesta es un chatbot para Barako que utiliza la técnica **RAG (Retrieval-Augmented Generation)** para generar respuestas personalizadas y contextuales. La arquitectura es completamente **serverless** e integra los siguientes componentes:

### 🛠️ Procesamiento y Gestión del Contexto

#### 1️⃣ Recepción de Mensajes:
Los clientes se comunican vía **WhatsApp**. Los mensajes pueden ser de **texto, voz o imagen**:
   - **Texto:** Se procesa directamente.
   - **Voz:** Se convierte a texto mediante un servicio de **STT (Speech-to-Text)**.
   - **Imagen:** Se procesa con **OCR (Optical Character Recognition)** para extraer el contenido textual.

#### 2️⃣ Intervención por Alerta (No Relacionada con Pago):
Tras procesar el mensaje, se evalúa si se requiere **intervención humana** (por alerta o situaciones críticas, como mensajes ambiguos):
   - Si se requiere, el sistema **notifica al operador vía panel web y/o WhatsApp**.
   - El operador interviene, revisa el mensaje, **actualiza el contenido y cambia el estado** de la conversación para que el flujo continúe.
   - Si no se requiere intervención, se **continúa sin cambios**.

#### 3️⃣ Consulta de Clima y Carga del Historial (Primera Interacción):
En la **primera interacción con el cliente** se realizan dos acciones:
   - Se consulta el **API de clima** para avisar sobre posibles retrasos (por ejemplo, *"Debido al mal tiempo, los pedidos podrían tardar más"*).
   - Se recupera el **historial del cliente** desde la base de datos y se carga en la **memoria activa** mediante LangChain.

En **interacciones subsiguientes**, se utiliza la memoria activa ya cargada, evitando consultas repetidas.

#### 4️⃣ Recuperación del Contexto Global:
En cada interacción se consulta una **vector database gestionada** (por ejemplo, **Pinecone**) para obtener el **contexto global del restaurante** (menú, formas de pago, ejemplos). Esto enriquece el **prompt enviado a la API de OpenAI**.

---

### 🤖 Generación de Respuesta y Verificación de Pago

#### 5️⃣ Construcción del Prompt Enriquecido:
Se combina el **mensaje actualizado** (incluyendo, de ser necesario, la intervención del operador), la **memoria activa** (historial del cliente) y el **contexto global** para formar un **prompt enriquecido**.

#### 6️⃣ Generación de Respuesta:
El prompt se envía a la **API de OpenAI (GPT-4)**, que genera una respuesta **personalizada y contextualizada**.

#### 7️⃣ Envío de Respuesta y Verificación de Pago:
La respuesta generada se **envía al cliente vía WhatsApp**. Se espera la respuesta del cliente para determinar si **confirma el pago**:
   - Si el cliente **no confirma**, se **reinicia la conversación**.
   - Si el cliente **confirma el pago**, se envía una notificación a la **plataforma web** para que el operador **verifique la transacción**.
   - El operador **debe confirmar y cambiar el estado del pago**; si no lo confirma, se envía una **alerta vía WhatsApp** hasta obtener la verificación.
   - Una vez confirmado, se envía la **confirmación final** al cliente (*"Pago confirmado, pedido en proceso"*).

---

### 💾 Persistencia y Finalización

#### 8️⃣ Persistencia del Historial:
Al finalizar, la conversación **se persiste en la base de datos** para personalizar futuras interacciones.

#### 9️⃣ Finalización de la Sesión:
Finalmente, la sesión se **cierra**, completando el flujo de interacción.

---

## Esquema de la Solución del Chatbot

[![](https://mermaid.ink/img/pako:eNqtVttu2zgQ_RWCQFEHSIracerED1vIsuO4zUW13aRNnYeJxNjclUiVkry5IJ-Up37AAvWPdUjqYqm7b5unUDozc-bM8FhP1JcBo316F8q__RWolMwHC0Hwz_m2oG7ImUgZWXMgVytIEyeOF_SG7O39QQb4_hSi2wD6ZMp8Fvt880OQgIXkjIkE_mSItKkGJsB9WtA5jyVCCsT7BX22EBchBN-z-1QuqMEPsYCnpM8SiDQNE5gDbmpRl_IxjxlhzCxmzF_tpXJPg0lrNp_vNCMmESyZyIOOMejCnZIYFJDRfaqAqUahkWVkD8fFwR5fvSITFEmtmbASxFIRCJlKgbSEJIqF4HMpIADiS3wNS7ljQ4cm0xiF-fnPlH3POFOM8P9IVok1tk3MNi95Byd6VjgLbjQaJSkEkjwQIVN-x32wmSAkFzFT-EqR9eYFiAcCh3XFbss2T0y2ieFTYi0fLnRG8NMMQv64-UEwNGpOcWKJnRcj_IC8RgK3B3tY80TausUmbTMqKXywFGr5qkY_6lEVxAoysMUFOfpaCHxmVDB5yzm5UiRZiHNBlfyQR2DgaglmbVc8SaXiyKqVyFASJkgIJFY8woJWBvCNlvn4PhpOp9-0XF4Om2zB3pddjRvCnNrHp83-zvQgC5KuZlimODOAcwToEkuFmjpGU-zFIDXf5s37rcAFxuNtzbSGipyUHdsk5rK3hoPqvlyYKM_sF-qksEKkI4jjp3yNC34KYumugIudZtGyWc8-Pi8O5TgKIpVz4P1I9cUjy1DemkFwFsWK5YJ7JsWnWg9uETLOQy6Zj02R4aBPPC4YpmQ7v69BqjK_qhsrGcUpbgO6whYhvLtJnOlNsrGfTP1pPqTtFMSzGUZC8e8Z83lQmcfURM2qu5BjUURvomNxo4UzIa2xN9_rVjrOTNzcdJvTIGPDL4B6Q5h38yJrhPXl8vOJPuBl0GKZtZfijquoalHbkU00N_U-VzyrsjX7t-jPBn2p0YmdRAXXkubrVOIvDf7KeIvbJOEhicpGrhoL5NQeV8v85X-wvVLDS6a2onJhjGHXDXmVRSDyffhiaHyt-2WhsHaluNbX10Zf11v2aH8v6v6IJNY1Vv9mmNeWQ61CJZHjbDtmSa3hkuUeFEkdx0YPKob1mR1zgWSgHHOfvPZyvQwqkLskZgFeA21LsfkZl6_rintMJWhAWljN6E6nRDcvB4Dmm7BEn3JS9jvCcfWHgY3lpicUKcnDsNhwQFpO8dOw5XHVxXJcm0h_YWAjea1ZXove0F2KXh4BD_DL6EnHLGi6YhEucx__DUD9taAL8Yw4yFI5exA-7aMbsF2qZLZc0f4dhAmesjiAlA05oF1HBSQGcS3l9pH2n-g97bff7r9ptw-7R51Ob7_Tedc72qUP-PjoTfew3e4ddNsHb9sHvd7zLn00CRDeOege9DqH7w73u7127_kXzKEsYA?type=png)](https://mermaid.live/edit#pako:eNqtVttu2zgQ_RWCQFEHSIracerED1vIsuO4zUW13aRNnYeJxNjclUiVkry5IJ-Up37AAvWPdUjqYqm7b5unUDozc-bM8FhP1JcBo316F8q__RWolMwHC0Hwz_m2oG7ImUgZWXMgVytIEyeOF_SG7O39QQb4_hSi2wD6ZMp8Fvt880OQgIXkjIkE_mSItKkGJsB9WtA5jyVCCsT7BX22EBchBN-z-1QuqMEPsYCnpM8SiDQNE5gDbmpRl_IxjxlhzCxmzF_tpXJPg0lrNp_vNCMmESyZyIOOMejCnZIYFJDRfaqAqUahkWVkD8fFwR5fvSITFEmtmbASxFIRCJlKgbSEJIqF4HMpIADiS3wNS7ljQ4cm0xiF-fnPlH3POFOM8P9IVok1tk3MNi95Byd6VjgLbjQaJSkEkjwQIVN-x32wmSAkFzFT-EqR9eYFiAcCh3XFbss2T0y2ieFTYi0fLnRG8NMMQv64-UEwNGpOcWKJnRcj_IC8RgK3B3tY80TausUmbTMqKXywFGr5qkY_6lEVxAoysMUFOfpaCHxmVDB5yzm5UiRZiHNBlfyQR2DgaglmbVc8SaXiyKqVyFASJkgIJFY8woJWBvCNlvn4PhpOp9-0XF4Om2zB3pddjRvCnNrHp83-zvQgC5KuZlimODOAcwToEkuFmjpGU-zFIDXf5s37rcAFxuNtzbSGipyUHdsk5rK3hoPqvlyYKM_sF-qksEKkI4jjp3yNC34KYumugIudZtGyWc8-Pi8O5TgKIpVz4P1I9cUjy1DemkFwFsWK5YJ7JsWnWg9uETLOQy6Zj02R4aBPPC4YpmQ7v69BqjK_qhsrGcUpbgO6whYhvLtJnOlNsrGfTP1pPqTtFMSzGUZC8e8Z83lQmcfURM2qu5BjUURvomNxo4UzIa2xN9_rVjrOTNzcdJvTIGPDL4B6Q5h38yJrhPXl8vOJPuBl0GKZtZfijquoalHbkU00N_U-VzyrsjX7t-jPBn2p0YmdRAXXkubrVOIvDf7KeIvbJOEhicpGrhoL5NQeV8v85X-wvVLDS6a2onJhjGHXDXmVRSDyffhiaHyt-2WhsHaluNbX10Zf11v2aH8v6v6IJNY1Vv9mmNeWQ61CJZHjbDtmSa3hkuUeFEkdx0YPKob1mR1zgWSgHHOfvPZyvQwqkLskZgFeA21LsfkZl6_rintMJWhAWljN6E6nRDcvB4Dmm7BEn3JS9jvCcfWHgY3lpicUKcnDsNhwQFpO8dOw5XHVxXJcm0h_YWAjea1ZXove0F2KXh4BD_DL6EnHLGi6YhEucx__DUD9taAL8Yw4yFI5exA-7aMbsF2qZLZc0f4dhAmesjiAlA05oF1HBSQGcS3l9pH2n-g97bff7r9ptw-7R51Ob7_Tedc72qUP-PjoTfew3e4ddNsHb9sHvd7zLn00CRDeOege9DqH7w73u7127_kXzKEsYA)

---

## 📌 Suposiciones

1. **Volumen de Conversaciones:**  
   - Se asume un promedio de 100 órdenes (conversaciones) al día.  
   - Cada conversación puede incluir varios mensajes, pero se estima una longitud promedio que se mantiene en el rango gratuito de AWS Lambda.

2. **Cantidad de Mensajes Business-Initiated en WhatsApp:**  
   - Se considera que solo un porcentaje de las conversaciones requerirá mensajes iniciados por el negocio (por ejemplo, para verificación de pago o intervenir manualmente).  
   - Se estima una tasa de 30 al mes de esos mensajes para efectos de cálculo (cada uno a \$0.0113).

3. **Uso de Tokens (OpenAI):**  
   - Se calcula que cada conversación utiliza alrededor de 2,000 tokens (entre entrada y salida).  
   - La tarifa para GPT-4o se ha tomado como referencia (~\$0.0025 / 1,000 tokens de input y ~\$0.01 / 1,000 tokens de output).  
   - Ajustando para un incremento potencial del 33% (estimación inicial que deberá validarse) por incluir historial de conversaciones del cliente, menú, métodos de pago y ejemplos, se estima un costo mensual de ~\$50.

4. **Costo de STT:**  
   - Aproximadamente, se asume que el 30% de las conversaciones contienen notas de voz de 15 segundos.
   - Con un costo de ~\$1.44 por hora de audio con Amazon Transcribe, cada nota de 15 segundos cuesta ~$0.006.
   - Para 30 notas diarias ~$5.40/mes.

5. **OCR:**  
   - Las imágenes enviadas (PNG, JPG, etc.) se consideran excepcionales. Suponiendo que se procesen, por ejemplo, 5 imágenes diarias (unas 150 imágenes mensuales), y utilizando Amazon Textract Detect Document Text API a ~\$1.50 por 1,000 páginas, el costo sería de aproximadamente de ~$0.225/mes.

6. **Interfaz Web de Operadores:**  
   - El frontend se alojará en S3 con CloudFront, y se usará API Gateway + AWS Lambda para el backend.
   - Se estima que, para un tráfico moderado (alrededor de 1 millón de llamadas API mensuales y menos de 1 TB de transferencia de datos), el costo combinado es de \$1–\$5 mensuales (~$0.23/mes en S3 para 10 GB más CloudFront + API Gateway).

7. **Vector Database (Pinecone):**  
   Se estima el uso del plan Standard de Pinecone, que cuesta $25/mes para un uso moderado.

8. **API de Clima:**  
   Se asume el uso de un servicio como OpenWeatherMap que ofrece un plan gratuito con un alto número de llamadas mensuales. En un escenario de bajo volumen (una consulta por interacción, principalmente en la primera), el costo es prácticamente \$0. En caso de necesitar un plan pagado, se estima un costo adicional en el rango de \$10–$20/mes, pero para nuestro caso se espera usar el free tier.

---

## 🛒 Componentes y Explicaciones

### 1. API de OpenAI (Interacción Inteligente)
- **Qué es:** Es el motor de inteligencia artificial que entiende y responde a los mensajes del cliente.
- **Costo Aproximado:** $50 mensuales
- **Detalles:** Se cobra según la cantidad de “tokens” (palabras o partes de palabras) que se usan en las entradas y salidas de cada conversación.

### 2. AWS Lambda (Ejecución de Código)
- **Qué es:** Es el servicio que ejecuta el código de la aplicación. Cada vez que el cliente envía un mensaje, se activa una función en Lambda para procesarlo.
- **Costo Aproximado:** Gratis (dentro del nivel gratuito de AWS)
- **Detalles:** Aunque cada conversación puede generar múltiples invocaciones (por ejemplo, 10 llamadas por conversación), la cantidad total sigue estando dentro del límite gratuito de AWS Lambda.

### 3. Amazon ECR (Almacenamiento del Contenedor)
- **Qué es:** Es el repositorio donde se guarda la imagen (el “contenedor”) de la aplicación, asegurando que el código se ejecute de forma consistente.
- **Costo Aproximado:** ~$0,03 mensuales
- **Detalles:** Se cobra por el almacenamiento, y el tamaño de la imagen es pequeño.

### 4. WhatsApp Business Platform API (Canal de Comunicación)
- **Qué es:** Permite recibir y enviar mensajes a través de WhatsApp.
- **Costo Aproximado:**
  - **Mensajes iniciados por el cliente (user-initiated):** Gratis en Venezuela.
  - **Modalidad de utilidad (business-initiated):** \$0.339/mes.
    - Se aplica cuando la empresa inicia la conversación, por ejemplo, para notificar al operador humano sobre la verificación de pago o cualquier otro mensaje proactivo.  
- **Detalles:** El costo total dependerá de cuántas conversaciones inicie la empresa.

### 5. GitHub Actions (Integración y Despliegue Continuo)
- **Qué es:** Es la herramienta que automatiza la actualización y despliegue del código, asegurando que siempre se use la versión correcta en producción.
- **Costo Aproximado:** Gratis (dentro del límite gratuito de GitHub)
- **Detalles:** Automatiza las pruebas, compilaciones y despliegues, facilitando el mantenimiento continuo del sistema.

### 6. STT (Amazon Transcribe) / OCR con (Amazon Textract)
- **Qué es:** Servicios para convertir voz a texto y extraer texto de imágenes.
- **Costo Aproximado:**  
  - STT: Variable (~$5.40/mes).
  - OCR para imágenes: En nuestro contexto, el costo es muy bajo (~$0.225/mes), dado que son casos excepcionales.

### 7. Base de Datos (Amazon DynamoDB) para Historial y Contexto
- **Qué es:** Almacena el historial de conversaciones y otros datos relevantes.
- **Costo Aproximado:** <$5/mes (usualmente en free tier).

### 8. Interfaz Web para Operadores
- **Qué es:** Panel web para gestionar y aprobar pedidos.
- **Implementación:**  
  - Frontend con React alojado en **S3** con **CloudFront**.
  - Backend con Flask o funciones puras en Python gestionado con **API Gateway + AWS Lambda**.
- **Costo Aproximado:** ~\$1–$5/mes para tráfico moderado.

### 9. Vector Database (Pinecone)
- **Qué es:** Base de datos para almacenar y consultar embeddings (contexto global).
- **Costo Aproximado:** ~$25/mes para uso moderado.

### 10. API de Clima (OpenWeatherMap)
- **Qué es:** Servicio para obtener datos meteorológicos y notificar al cliente sobre posibles retrasos.
- **Costo Aproximado:** Gratis (una consulta por interacción)

---

## 💰 Costo Total Estimado Mensual

| **Componente**                         | **Costo Aproximado**                                                                                                                                     |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| API de OpenAI                          | ~$50/mes                                                                                                                                                 |
| AWS Lambda, Amazon ECR, GitHub Actions | Gratis (free tier)                                                                                                                                       |
| WhatsApp Business API                  | ~$0.339/mes                                                                                                                                              |
| STT / OCR                              | ~\$5.40 + ~$0.225/mes                                                                                                                           |
| Base de Datos (DynamoDB)               | <$5/mes                                                                                                                                                  |
| S3 + CloudFront + API Gateway (UI)     | ~\$1–$5/mes                                                                                                                                               |
| Vector Database (Pinecone)             | ~$25/mes                                                                                                                                                 |
| API de Clima                           | $0 (free tier)                                                                                                    |
| **Total Aproximado**                   | **~\$85–$90/mes**  |

---

## ⏳ Estimación de Horas de Desarrollo y Cronograma

### Estimación de Horas de Desarrollo

Se estima que el desarrollo del proyecto se puede dividir en las siguientes fases:

| **Actividad**                                            | **Horas Estimadas** |
|----------------------------------------------------------|---------------------|
| Análisis y Planificación                                 | 6 – 12 horas        |
| Integración con WhatsApp Business API                    | 2 – 4 horas         |
| Desarrollo de funciones en AWS Lambda                    | 8 – 16 horas        |
| Integración con la API de OpenAI (RAG base)              | 8 – 16 horas        |
| STT / OCR / Manejo de Imágenes                           | 8 – 16 horas        |
| Integración de Datos de Clima                            | 3 – 6 horas         |
| Base de Datos (Historial y Contexto)                     | 6 – 12 horas        |
| Interfaz Web para Operadores                             | 10 – 20 horas       |
| Configuración del CI/CD (GitHub Actions)                 | 3 – 6 horas         |
| Pruebas, Depuración y Documentación                      | 4 – 8 horas         |
| **Total Aproximado**                                     | 58 – 116 horas      |
| **Costo Aproximado (con una tarifa de **$50 la hora**)** | \$2900 - $5.800     |

### Cronograma Propuesto

| **Calendario Aproximado**         | **Fase y Actividades**                                                                                              | Horas Estimadas |
|-----------------------|---------------------------------------------------------------------------------------------------------------------|-----------------|
| **Fin de Semana 1**   | - Análisis y Planificación: Definición final y ajuste de requerimientos.                                            | 8 – 16 horas    |
| **Fin de Semana 2**   | - Integraciones Básicas: Configuración de WhatsApp Business API y API de Clima.                                     | 8 – 16 horas    |
| **Fin de Semana 3**   | - Desarrollo de AWS Lambda + OpenAI (RAG base): Implementación de la lógica del chatbot.                            | 8 – 16 horas    |
| **Fin de Semana 4**   | - STT/OCR y Carga del Historial (Primera Interacción): Procesamiento de voz/imágenes y carga inicial del historial. | 8 – 16 horas    |
| **Fin de Semana 5**   | - Interfaz Web para Operadores: Desarrollo del panel de gestión.                                                    | 8 – 16 horas    |
| **Fin de Semana 6**   | - Configuración CI/CD y Despliegue: Automatización y pruebas.                                                       | 8 – 16 horas    |
| **Fin de Semana 7**   | - Pruebas, Depuración y Documentación: Validación final y ajustes.                                                  | 5 – 10 horas    |
| **Fin de Semana 8**   | - Ajustes finales o iteraciones adicionales (opcional, en caso de necesitar más tiempo).                            | 5 – 10 horas    |

> **Nota:**  
> Las estimaciones de horas y el cronograma son aproximados y pueden variar según la complejidad real del proyecto y los imprevistos durante el desarrollo. Es recomendable definir hitos y realizar revisiones periódicas para ajustar tiempos y tareas.

---

## Fase de Optimización Avanzada (Opcional Extra)

Esta fase se ofrece como mejora adicional al proyecto base y puede incluir:

- **Optimización del Pipeline RAG:**  
  - **Pre-Retrieval:**  
    - Mejora en la calidad y chunking de los datos (ej. menú, métodos de pago, ejemplos históricos).  
    - Inclusión de metadatos para refinar la búsqueda.
  - **Retrieval:**  
    - Implementación de técnicas avanzadas de reescritura de queries (Multi-Query Retriever, Query Rewriting).  
    - Selección y ajuste de un vector DB (por ejemplo, FAISS, Pinecone o Weaviate).
  - **Post-Retrieval:**  
    - Ingeniería de prompts avanzada, con templates dinámicos que integren solo la información relevante.
    - Automatización y re-ranking de respuestas: Enviar múltiples variantes de prompts y seleccionar la mejor respuesta mediante un sistema de ranking.
  
- **Horas Adicionales:**  
  - Se estima que esta fase adicional requeriría entre 8 y 16 horas extra.
  
- **Costo Extra:**  
  - Con una tarifa de \$50 la hora, el costo adicional sería de aproximadamente \$400 a \$800.
  
> **Nota:** La fase de optimización avanzada se ofrece como un extra opcional, permitiendo que el proyecto base se entregue en un plazo ajustado y con un techo máximo de 50 horas.

## Anexo: Breve Descripción de RAG y Verificación Humana

### 1. ¿Qué es RAG?

- **Definición:**  
  RAG es un enfoque de inteligencia artificial en el que se combina un modelo de lenguaje (por ejemplo, GPT‑4) con un mecanismo de recuperación de información (base de datos, vector DB, etc.). Antes de generar una respuesta, el sistema recupera información relevante (menú, métodos de pago, historial de conversaciones) y la “inyecta” en el prompt o la solicitud al modelo. De esta forma, el modelo tiene datos más precisos y contextuales, mejorando la calidad de la respuesta.

- **Cómo se va a usar:**  
  1. **Almacén de Datos / Repositorio**: El contenido del menú, ejemplos de conversaciones previas o FAQs se estructuran en fragmentos (chunks).  
  2. **Búsqueda de Contexto**: Cuando llega la consulta del cliente, se hace una búsqueda rápida en dicho repositorio para obtener solo la información relevante.  
  3. **Generación de Respuesta**: El texto recuperado se añade al prompt que se envía a GPT‑4, permitiéndole responder de forma más precisa y ajustada a la realidad del negocio.

- **Beneficio:**  
  - Mantener la conversación siempre actualizada con los datos más recientes (por ejemplo, cambios en el menú o en los precios).  
  - Reducir costos, ya que no se necesita entrenar o fine-tunear el modelo con todos los datos del negocio; basta con hacer la recuperación dinámica.

### 2. ¿Cómo opera la intervención humana?
- **Intervención por Alerta:**
  - Tras el procesamiento del mensaje, se evalúa si se requiere intervención por alerta (por mensajes ambiguos o problemáticos).
  - Si se requiere, el sistema **notifica al operador** vía panel web.
  - El operador **revisa el mensaje y debe intervenir y cambiar el estado** de la conversación (por ejemplo, actualizando el mensaje).  
    *Si el operador no interviene, se reenvía un aviso vía WhatsApp hasta que se actualice el estado.*
  
- **Verificación de Pago:**
  - Al final de la interacción, se pregunta al cliente si **confirma el pago**.
  - Si el cliente confirma, se **notifica a la plataforma web** para que el operador verifique la transacción.
  - El operador debe **confirmar y cambiar el estado del pago**; si no lo confirma, se envía una **alerta vía WhatsApp** hasta obtener la verificación.
  - Una vez confirmado, se envía al cliente la **confirmación final** (*"Pago confirmado, pedido en proceso"*) y se actualiza el historial en la base de datos.

---

## **Resumen Final**

Esta propuesta asegura que el chatbot ofrezca respuestas personalizadas y contextuales mediante el uso de RAG, optimizando el uso de tokens en la API de OpenAI e integrando la intervención humana en momentos críticos (alertas y verificación de pago) para garantizar la calidad del servicio. Además, se consideran los costos adicionales de OCR y de la API de clima, que son mínimos en nuestro contexto, lo que permite mantener el costo operativo total en torno a **\$85–$90/mes**.