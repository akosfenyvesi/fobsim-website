import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Link,
} from "@mui/material";
import OrderedList from "./list/components/OrderedList";
import VideoStepper from "./carousel/components/VideoStepper";

const components = [
  "Fog layer implementation.",
  "Blockchain network Implementation.",
  "End-User layer implementation.",
  "Consensus algorithms.",
  "Incentivization Mechanisms.",
  "Parallel Mining.",
  "Gossip Protocol.",
  "Easy network topology and unique identities management.",
];

const services = [
  "Payment/Trading",
  "Data management",
  "Identity management",
  "Computational Services through Smart Contracts",
];

const consensusAlgorithms = [
  "Proof-of-Work (PoW)",
  "Proof-of-Stake (PoS)",
  "Proof-of-Authority (PoA)",
  "Proof-of-Elapsed-Time (PoET)",
  "delegated Proof-of-Stack (dPoS)",
];

function Home() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            FoBSim - Fog-enhanced Blockchain Simulation
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ marginTop: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Introduction" />
              <CardContent>
                <Typography variant="body1">
                  FoBSim aims to introduce a reliable Fog-enhanced Blockchain
                  simulation environment, facilitating easy simulation for
                  different Fog-Blockchain integration scenarios.
                </Typography>
                <Typography variant="body1">
                  This research work is a part of a paper that is published in
                  the PeerJ-Computer Science journal. The open-access paper can
                  be found at:{" "}
                  <Link
                    href="https://peerj.com/articles/cs-431/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://peerj.com/articles/cs-431/
                  </Link>
                </Typography>
                <br />
                <Typography variant="body1">
                  IMPORTANT NOTE: Published code should be considered
                  copyrighted whether or not it includes an explicit copyright
                  notice. This means that no one can distribute, reproduce,
                  display, or create derivative works of the software, for
                  commercial purposes, without permission of the copyright
                  owner. Nevertheless, permission is granted for reproducing and
                  creating derivative works for noncommercial activities (e.g.
                  Research), given that appropriate crediting is provided, and
                  changes that were made were indicated. You may do so in any
                  reasonable manner, but not in any way that suggests the
                  licensor endorses you or your use.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Components Implemented in FoBSim" />
              <CardContent>
                <OrderedList listItems={components} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Blockchain Services" />
              <CardContent>
                <OrderedList listItems={services} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Consensus Algorithms" />
              <CardContent>
                <OrderedList listItems={consensusAlgorithms} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Video Tutorials" />
              <CardContent>
                <VideoStepper />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
