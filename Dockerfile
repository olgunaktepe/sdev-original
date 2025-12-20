FROM php:7.4-apache

# Install PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Install dependencies for image handling and composer
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev curl unzip git \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy source files
COPY src/ /var/www/html/

# Copy Railway-specific settings (overwrites production settings)
COPY docker/settings.railway.php /var/www/html/settings.php

# Copy Railway-specific .htaccess for URL routing
COPY docker/.htaccess /var/www/html/.htaccess

# Copy Railway-specific ipblock.php (bypasses IP whitelist for test environment)
COPY docker/ipblock.php /var/www/html/ipblock.php

# Install Composer dependencies for libraries that need them
RUN cd /var/www/html/php/lib/twilio/voice-javascript-sdk-quickstart-php-main && composer install --no-dev --no-interaction --prefer-dist 2>/dev/null || true
RUN cd /var/www/html/php/lib/AWS && composer install --no-dev --no-interaction --prefer-dist 2>/dev/null || true

# Copy and set up entrypoint
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Enable .htaccess overrides
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
