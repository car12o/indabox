import React, { useState, useRef } from "react"
import { connect } from "react-redux"
import { makeStyles, Backdrop, Paper, Button, Typography } from "@material-ui/core"

const useStyles = makeStyles(({ zIndex }) => ({
  backdrop: {
    zIndex: zIndex.drawer + 1,
    color: "#fff"
  },
  paper: {
    width: "1200px",
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  container: {
    padding: "25px",
    overflow: "auto",
    height: "90%"
  },
  paperContent: {
    textAlign: "justify",
    display: "flex",
    flexDirection: "column"
  },
  paperSpan: {
    paddingLeft: "25px",
    margin: "2px 0"
  },
  button: {
    width: "150px",
    margin: "25px"
  },
  spacer: {
    margin: "5px 0"
  }
}))

const _TermAndConditions = ({ open, label, onClick }) => {
  const [disabled, setDisabled] = useState(true)
  const classes = useStyles()
  const ref = useRef({})

  const onScroll = () => {
    const { current } = ref
    const { top } = current.getBoundingClientRect()
    if (top + 200 < window.innerHeight && disabled) {
      setDisabled(false)
    }
  }

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <Paper classes={{ root: classes.paper }}>
        <div className={classes.container} onScroll={onScroll}>
          <Typography color="primary" variant="h5" align="center" paragraph>
            Política de privacidade do Site da SPPSM
          </Typography>
          <p className={classes.paperContent}>
            A utilização deste Site está sujeita à presente Política de Privacidade. O Utilizador deve ler
            esta Política de Privacidade cada vez que pretenda utilizar o Site da Sociedade Portuguesa de
            Psiquiatria e Saúde Mental (SPPSM).
            <span className={classes.spacer} />
            Este Site foi desenvolvido visando assegurar que a privacidade
            do Utilizador seja respeitada e que os seus dados pessoais sejam devidamente protegidos,nos termos da
            legislação aplicável, nomeadamente, do Regulamento Geral Sobre a Proteção deDados (RGPD).
            <span className={classes.spacer} />
            Esta Política de Privacidade é facilmente acessível a partir da página inicial doSite e através do
            link para qualquer outra página do mesmo, na qual sejam eventualmente recolhidos dados pessoais.
            Esta política, bem como qualquer eventual informaçãoadicional, destina-se a assegurar a proteção dos
            dados pessoais dos visitantes e utilizadores do Site da Sociedade Portuguesa de Psiquiatria
            e Saúde Mental (SPPSM).
          </p>
          <Typography color="primary">
            1. Privacidade
          </Typography>
          <p className={classes.paperContent}>
            O termo "dados pessoais" constante desta política é utilizado para definir apenas os seguintes: nome e
            endereço de e-mail, relativa a uma pessoa singular identificada ou identificável, nos termos do RGPD.
          </p>
          <Typography color="primary">
            2. Tratamento de dados Pessoais
          </Typography>
          <p className={classes.paperContent}>
            A responsabilidade pelo tratamento dos dados pessoais disponibilizados é
            exclusiva da SPPSM.
            <span className={classes.spacer} />
            A SPPSM compromete-se a tratar os dados pessoais de forma lícita, transparente, com
            respeito pelo princípio da boa-fé e com absolutaconfidencialidade.
            <span className={classes.spacer} />
            Os dados pessoais apenas serão
            recolhidos para finalidades determinadas, explícitas e legítimas, não sendo, em circunstância alguma,
            tratados de forma incompatível com essas finalidades.
            <span className={classes.spacer} />
            A SPPSM garante que os dados pessoais recolhidos
            são adequados, pertinentes e não excessivos relativamente às finalidades para que são recolhidos e
            tratados.
            <span className={classes.spacer} />
            Os dados recolhidos são processados informaticamente, sendo armazenados em bases de dados
            específicas, criadas e geridas para o efeito pela SPPSM, no estrito cumprimento da legislação de proteção
            de dados pessoais.
          </p>
          <Typography color="primary">
            3. Finalidade
          </Typography>
          <p className={classes.paperContent}>
            Os dados recolhidos podem ser utlizados pela SPPSM para o envio de informação sobre produtos, serviços e
            campanhas de publicidade.
            <span className={classes.spacer} />
            A SPPSM mantém os seus dados pessoais apenas durante o período mínimo de tempo
            necessário, e sempre nos termos legais.
          </p>
          <Typography color="primary">
            4. Confidencialidade das informações
          </Typography>
          <p className={classes.paperContent}>
            Qualquer comunicação a terceiros de dados pessoais será feita com o consentimento expresso e prévio do
            Utilizador. A SPPSM não comunicará os seus dados pessoais a entidades externas.
            <span className={classes.spacer} />
            Excecionalmente,os seus dados pessoais poderão ser divulgados a terceiros, para:
            <span className={classes.paperSpan}>- cumprir leis aplicáveis;</span>
            <span className={classes.paperSpan}>- responder a inquéritos judiciais;</span>
            <span className={classes.paperSpan}>- estar em conformidade com processos legais válidos;</span>
            <span className={classes.spacer} />
            No entanto, a mencionada divulgação estará sempre dependente do consentimento do Utilizador. O seu
            consentimento, expresso, em conformidade com as disposições do presente parágrafo, pode ser revogado
            a todo o tempo. A SPPSM informará os terceiros a quemos dados foram transferidos de todas as
            revogações de consentimento para o tratamento dosdados.
          </p>
          <Typography color="primary">
            5. Segurança e confidencialidade
          </Typography>
          <p className={classes.paperContent}>
            Para garantir a segurança e a confidencialidade dos dados pessoais recolhidos online pela SPPSM esta
            utilizará bases de dados protegidas, entre outros, firewalls adequados e palavras passe. Embora a SPPSM
            não possa excluir completamente a possibilidade de perda, uso fraudulento ou alteraçãode dados, pretende
            com estas medidas evitar tais efeitos adversos.
          </p>
          <Typography color="primary">
            6. Direito de acesso
          </Typography>
          <p className={classes.paperContent}>
            Os titulares de dados pessoais recolhidos poderão a qualquer momento, exercer, nomeadamente, os direitos
            de acesso, retificação, apagamento, portabilidade e oposição ao tratamento dos seus dados, através do
            envio de um e-mail para info@sppsm.org.
          </p>
          <Typography color="primary">
            7. Alterações à Política de Privacidade
          </Typography>
          <p className={classes.paperContent}>
            A SPPSM reserva-se o direito de, a qualquer momento, atualizar ou rever a Política de Privacidade
            enunciada neste documento a fim de a ajustar a eventuais alterações legislativas e outros
            condicionalismos.
            <span className={classes.spacer} />
            A utilização continuada do site após a publicação de alterações à Política de
            Privacidade implicará a aceitação da mesma.
          </p>
          <Typography color="primary">
            Política de Cookies
          </Typography>
          <p className={classes.paperContent}>
            De forma a prestar um serviço mais personalizado, este site utiliza cookies para melhorar a
            navegabilidade dos utilizadores do site, permitindo oferecer uma experiência mais personalizada.
            Os utilizadores podem, em qualquer altura apagar ou bloquear a receção de cookies.
            <span className={classes.spacer} />
            Os Cookies são ficheiros gravados no seu computador que têm como único objetivo simplificar a sua
            navegação no website sppsm.org (por não serem ficheiros ativos, estes cookies não podem conter vírus
            nem ser executados). Os cookies não identificam o utilizador, nem são utilizados para recolher
            informações pessoais, apenas identificam o computador utilizado.
            <span className={classes.spacer} />
            Estes ficheiros permitem:
            <span className={classes.paperSpan}>
              - Melhorar a experiência e desempenho na navegação, facilitando aos utilizadores o acesso à informação
              que procuram;
            </span>
            <span className={classes.paperSpan}>
              - Estar informado sobre a nossa oferta de produtos e/ou serviços;
            </span>
            <span className={classes.paperSpan}>
              - Por respeitarmos as políticas de privacidade dos utilizadores, estes cookies apenas podem ser
              lidos pelo nosso website e por si, e poderá apagá-los se desejar;
            </span>
            <span className={classes.spacer} />
              Para poder beneficiar de todas estas vantagens, certifique-se que o seu browser aceita cookies:
            <span className={classes.paperSpan}>
              - No menu "Ferramentas", selecione "Opções de Internet";
            </span>
            <span className={classes.paperSpan}>
              - Clique no separador "Privacidade";
            </span>
            <span className={classes.paperSpan}>
              - Procure e selecione a opção "Aceitar Cookies";
            </span>
            <span className={classes.spacer} ref={ref} />
            Caso não deseje receber cookies, deverá configurar o seu computador para o avisar sempre que receber
            um cookie ou desativar todos os cookies através do seu browser.
            <span className={classes.spacer} />
            Se desativar os cookies, poderá não conseguir aceder a algumas das funções acima indicadas.
            <span className={classes.spacer} />
            Através das suas definições, a maioria dos browsers permite ter algum controlo sobre a maioria
            dos cookies.  Para obter mais informações sobre cookies, incluindo para saber que cookies foram
            instalados e como podem ser geridos e eliminados, visite &nbsp;
            <a style={{ display: "contents" }} href="https://allaboutcookies.org" target="blank">
              www.allaboutcookies.org.
            </a>
          </p>
        </div>
        <Button
          classes={{ root: classes.button }}
          color="primary"
          size="large"
          variant="contained"
          onClick={() => onClick()}
          disabled={disabled}
        >
          {label}
        </Button>
      </Paper>
    </Backdrop>
  )
}

export const TermAndConditions = connect(({ user }) => ({ user }))(_TermAndConditions)
