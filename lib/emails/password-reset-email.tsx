interface Props {
  passwordResetUrl: string
}

export function PasswordResetEmail ({ passwordResetUrl }: Readonly<Props>) {
  return (
    <div>
      <style>
        {`
            /* Estilo predeterminado para escritorio */
            .container {
              width: 600px;
              margin: 0 auto;
            }

            .button {
              padding: 15px 25px;
              background-color: #4caf50;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              font-size: 16px;
              display: inline-block;
            }

            /* Estilo responsivo para dispositivos móviles */
            @media only screen and (max-width: 600px) {
              .container {
                width: 100%;
                padding: 0 10px;
              }

              .button {
                font-size: 14px;
                padding: 10px 20px;
              }

              .text-center {
                text-align: center !important;
              }
            }
          `}
      </style>
      <div style={{ margin: 0, padding: '10px', fontFamily: 'Inter, sans-serif', letterSpacing: '-.4px' }}>
        <table
          className='container'
          style={{
            width: '600px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            border: '1px solid #dddddd',
            borderRadius: '8px'
          }}
        >
          <tr>
            <td style={{ padding: '20px', textAlign: 'left' }}>
              <h1 style={{ margin: 0, fontSize: '24px' }}>Reset your password.</h1>
              <p style={{ fontSize: '16px', lineHeight: 1.5 }}>
                Reset your password here. Please click on link below:
              </p>
              <div className='text-center'>
                <a
                  href={passwordResetUrl}
                  className='button'
                  style={{
                    padding: '15px 25px',
                    backgroundColor: '#4caf50',
                    color: '#ffffff',
                    textDecoration: 'none',
                    borderRadius: '5px',
                    fontSize: '16px',
                    display: 'inline-block'
                  }}
                >
                  Reset Password
                </a>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  )
}
