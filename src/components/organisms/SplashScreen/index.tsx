import { useEffect, useState } from 'react';
import * as S from './styles';

const EXIT_DURATION_MS = 700;
// trava geral pra nunca deixar a pessoa presa numa tela preta pra sempre
// (rede falhando, imagem que nunca dispara load) — 5s já é mais que o pior
// caso visto testando (Hero real leva ~1.5s numa rede normal)
const SAFETY_TIMEOUT_MS = 5000;

/* Módulo reavaliado só em carregamento de página de verdade (reload/nova
 * aba) — não em navegação interna da SPA. Splash só faz sentido cobrindo o
 * primeiro carregamento real (onde a Hero ainda não tem nada em cache);
 * voltar pra "/" depois de navegar dentro do site já carrega as imagens
 * instantâneo do cache do navegador, então mostrar a tela preta de novo
 * seria só um flash sem propósito, não mascarar espera nenhuma. */
let hasShownThisPageLoad = false;

export interface SplashScreenProps {
  ready: boolean;
}

export function SplashScreen({ ready }: SplashScreenProps) {
  const [shouldRender] = useState(() => !hasShownThisPageLoad);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(shouldRender);

  useEffect(() => {
    if (shouldRender) hasShownThisPageLoad = true;
  }, [shouldRender]);

  useEffect(() => {
    if (!shouldRender || !mounted) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [shouldRender, mounted]);

  useEffect(() => {
    if (!shouldRender || !mounted) return;
    const safety = window.setTimeout(() => setExiting(true), SAFETY_TIMEOUT_MS);
    return () => window.clearTimeout(safety);
  }, [shouldRender, mounted]);

  useEffect(() => {
    if (shouldRender && ready) setExiting(true);
  }, [shouldRender, ready]);

  useEffect(() => {
    if (!exiting) return;
    const timeout = window.setTimeout(() => setMounted(false), EXIT_DURATION_MS);
    return () => window.clearTimeout(timeout);
  }, [exiting]);

  if (!shouldRender || !mounted) return null;

  return (
    <S.Container $exiting={exiting} aria-hidden="true">
      <S.Mark $exiting={exiting} />
    </S.Container>
  );
}
