import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const resend = new Resend('re_AsnrEywA_AoBfPrDmTuSD24aNoNx6eNU4');

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para enviar emails
app.post('/send-email', async (req, res) => {
  try {
    const { nombre, empresa, email, telefono, productoInteres, tipoConsulta, mensaje } = req.body;

    // Validar campos requeridos
    if (!nombre || !empresa || !email || !telefono || !mensaje) {
      return res.status(400).json({ 
        success: false, 
        message: 'Todos los campos marcados como requeridos son obligatorios' 
      });
    }

    // Construir contenido HTML del email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { 
            font-family: 'Arial', sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
            background-color: #f9f9f9;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .header { 
            background: linear-gradient(135deg, #EF0315, #ff6b6b);
            padding: 30px 20px; 
            text-align: center; 
            color: white;
          }
          .header h2 {
            margin: 0;
            font-size: 24px;
          }
          .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
          }
          .content { 
            padding: 30px; 
          }
          .field { 
            margin-bottom: 20px; 
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #EF0315;
          }
          .label { 
            font-weight: bold; 
            color: #2c3e50; 
            display: block; 
            margin-bottom: 8px;
            font-size: 14px;
          }
          .value { 
            color: #34495e; 
            font-size: 16px;
          }
          .message-box { 
            background: #e8f4fd; 
            padding: 20px; 
            border-radius: 8px; 
            margin-top: 20px; 
            border-left: 4px solid #3498db; 
          }
          .footer {
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            color: #666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class='container'>
          <div class='header'>
            <h2>📧 Nueva Solicitud de Asesoría - TUBCON</h2>
            <p>Fecha: ${new Date().toLocaleString('es-MX')}</p>
          </div>
          <div class='content'>
            <div class='field'>
              <span class='label'>👤 Nombre completo:</span>
              <span class='value'>${nombre}</span>
            </div>
            <div class='field'>
              <span class='label'>🏢 Empresa:</span>
              <span class='value'>${empresa}</span>
            </div>
            <div class='field'>
              <span class='label'>📧 Correo electrónico:</span>
              <span class='value'>${email}</span>
            </div>
            <div class='field'>
              <span class='label'>📞 Teléfono:</span>
              <span class='value'>${telefono}</span>
            </div>
            <div class='field'>
              <span class='label'>📦 Producto de interés:</span>
              <span class='value'>${productoInteres || 'No especificado'}</span>
            </div>
            <div class='field'>
              <span class='label'>❓ Tipo de consulta:</span>
              <span class='value'>${tipoConsulta || 'No especificado'}</span>
            </div>
            <div class='message-box'>
              <span class='label'>💬 Mensaje:</span>
              <div class='value'>${mensaje.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class='footer'>
            <p>Este mensaje fue enviado desde el formulario de contacto de TUBCON</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: 'TUBCON Asesoría <onboarding@resend.dev>',
      to: ['ventasycotizaciones@tubcon.com.mx'],
      subject: `Nueva solicitud de asesoría - ${empresa}`,
      html: htmlContent,
      reply_to: email
    });

    if (error) {
      console.error('Error de Resend:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Error al enviar el email: ' + error.message 
      });
    }

    console.log('✅ Email enviado exitosamente');
    res.json({ 
      success: true, 
      message: 'Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.' 
    });

  } catch (error) {
    console.error('Error del servidor:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor. Por favor, intenta más tarde.' 
    });
  }
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'Servidor de TUBCON funcionando correctamente',
    version: '1.0.0'
  });
});

// Manejar rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Ruta no encontrada' 
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📧 Endpoint de emails: http://localhost:${PORT}/send-email`);
});