import NextTopLoader from "nextjs-toploader";
import AppWrapper from "@/components/AppWrapper";
import 'react-datepicker/dist/react-datepicker.css';
import 'jsvectormap/dist/css/jsvectormap.min.css';
// Themes
// For Icons
import '@/assets/scss/icons.scss';

// For Default import Default.scss
import '@/assets/scss/config/default/bootstrap.scss';
import '@/assets/scss/config/default/app.scss';

// For Creative import Creative.scss
// import '@/assets/scss/config/creative/bootstrap.scss'
// import '@/assets/scss/config/creative/app.scss'

// For Modern import Modern.scss
// import '@/assets/scss/config/modern/bootstrap.scss'
// import '@/assets/scss/config/modern/app.scss'

// For Saas import Saas.scss
// import '@/assets/scss/config/saas/bootstrap.scss'
// import '@/assets/scss/config/saas/app.scss'

// For Material import Material.scss
// import '@/assets/scss/config/material/bootstrap.scss'
// import '@/assets/scss/config/material/app.scss'

// For Corporate import Corporate.scss
// import '@/assets/scss/config/corporate/bootstrap.scss'
// import '@/assets/scss/config/corporate/app.scss'

import favicon from "@/assets/images/favicon.ico";
export const metadata = {
  title: {
    template: '%s | Minton Next - Admin & Dashboard Template',
    default: 'Minton Next - Admin & Dashboard Template'
  },
  description: 'Minton is a fully featured premium admin template built on top of awesome Bootstrap 5.3.0. It has many ready-to-use hand-crafted components. The theme is fully responsive and easy to customize. The code is super easy to understand and gives power to any developer to turn this theme into a real web application.',
  icons: [favicon.src]
};
export default function RootLayout({
  children
}) {
  return <html lang="en">
        <body>
        <NextTopLoader color="#fefefe" showSpinner={false} />
        <AppWrapper>
            {children}
        </AppWrapper>
        </body>
        </html>;
}