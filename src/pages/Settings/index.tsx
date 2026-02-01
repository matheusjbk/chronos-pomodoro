import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { SettingsForm } from '../../components/SettingsForm';
import { MainTemplate } from '../../templates/MainTemplate';

export function Settings() {
  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>

      <Container>
        <SettingsForm />
      </Container>
    </MainTemplate>
  );
}
