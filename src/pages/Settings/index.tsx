import { useEffect } from 'react';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { SettingsForm } from '../../components/SettingsForm';
import { MainTemplate } from '../../templates/MainTemplate';

export function Settings() {
  useEffect(() => {
    document.title = 'Configurações - Chronos Pomodoro';
  }, []);

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
        <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          Personalize o tempo de foco, descanso curto e longo do seu Pomodoro
          (em minutos).
        </p>
      </Container>

      <Container>
        <SettingsForm />
      </Container>
    </MainTemplate>
  );
}
