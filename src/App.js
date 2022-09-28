import { startGame,territoryClick } from "./GameFunctions";
import { Container, BuildPanelContainer, TerritoryPanelContainer, BuildingUpgradeContainer } from "./Components/Container.styled";
import Building from "./Components/Building";
import Upgrade from "./Components/Upgrades";
import { StatsText,StatsInfoText,DescText } from "./Components/StyledText.styled"
import  { Button } from "./Components/Button.styled";

function App(){
  startGame();
  return (
    <Container>
      <BuildPanelContainer>
        <h2>Army</h2>
        <DescText>Construct buildings to strengthen your army</DescText>
        <StatsText id="moneyText">Cash: $100000</StatsText>
        <StatsText id="soldiersText">Army strength: 1</StatsText>
        <StatsInfoText id="soldiersPerUpdateText">Army per cycle: 0</StatsInfoText>
        <BuildingUpgradeContainer>
          <Building name="Barrack" amount={1} price={10000} value={1} type="Army" unit="soldier" ></Building>
          <Upgrade name="Barrack" price={50000}></Upgrade>
        </BuildingUpgradeContainer>
        <BuildingUpgradeContainer>
          <Building name="Workshop" amount={1} price={500000} value={100} type="Army" unit="tank" ></Building>
          <Upgrade name="Workshop" price={2500000}></Upgrade>
        </BuildingUpgradeContainer>
        <BuildingUpgradeContainer>
          <Building name="Shipyard" amount={1} price={2500000} value={1000} type="Army" unit="battleship" ></Building>
          <Upgrade name="Shipyard" price={12500000}></Upgrade>
        </BuildingUpgradeContainer>
        <BuildingUpgradeContainer>
          <Building name="Aircraft Plant" amount={1} price={5000000} value={5000} type="Army" unit="Aircrafts" ></Building>
          <Upgrade name="Workshop" price={25000000}></Upgrade>
        </BuildingUpgradeContainer>
      </BuildPanelContainer>

      <TerritoryPanelContainer>
        <h2>Territory</h2>
        <DescText>Use your army to take over new Territory, this will cost army strength but more territory generates more income.<br/>Owning more territory will also cause soldiers to die by protecting it, causing loses over time</DescText>
        <StatsText id="territoryText">Territory: 1</StatsText>
        <StatsText id="incomeText">Income: $0</StatsText>
        <StatsText id="losesText">Loses per cycle: 0</StatsText>
        <StatsInfoText id="attackCostText">Attacking now will require 1,000 army forces and take 1 army to defend and generate $2,000 income</StatsInfoText>
        <Button onClick={() => territoryClick()}>Take over new Territory</Button>
      </TerritoryPanelContainer>
    </Container>
  )
}
export default App;
