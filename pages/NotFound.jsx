import React from "react";
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="vh-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">

          <div className="text-center">
            <img src="../public/404.svg" alt="Страница не найдена" className="img-fluid h-25" />
            <h1 className="h4 text-muted">{t('pageNotFound')}</h1>
            <p>{t('redirect')} <a href="/">{t('redirectOnMainPage')}</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;