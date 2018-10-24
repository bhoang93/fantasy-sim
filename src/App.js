import React, { Component } from "react";
import "./App.scss";

import enemyList from "./Lists/enemyList";

import Stats from "./Components/Stats/Stats";
import ActionBar from "./Components/ActionTabs/ActionBar";
import ActionLog from "./Components/ActionLog";

const maxActions = 3;

const playerStats = {
  isAlive: true,
  maxHp: 10,
  currentHp: 10,
  str: 5,
  def: 5,
  dex: 5,
  lck: 5,
  appr: 5,
  money: 0,
  actionsLeft: 3,
  turn: 0,
  actionLog: [],
  currentTab: "baseActions",
  changeTabText: "Go To Shop",
  inCombat: false
};

class App extends Component {
  constructor() {
    super();
    this.state = playerStats;
  }

  actions = [];
  inventory = [];

  takeAction = () => {
    this.setState(prevState => {
      return { turn: prevState.turn + 1 };
    });
  };

  reportAction = action => {
    this.actions.push(action);
    this.setState(prevState => {
      return { actionLog: this.actionLog };
    });
  };

  checkStatus = () => {
    if (this.state.currentHp < 1) {
      this.reportAction("You died!");
      this.setState(prevState => {
        return { actionsLeft: "💀", isAlive: false };
      });
    }
  };

  rollStat = stat => {
    return Math.floor(Math.random() * stat);
  };

  modifyStat = (stat, amt) => {
    this.takeAction();
    let checkActions = Math.max(this.state.actionsLeft - 1, 0);
    if (this.state.actionsLeft > 0) {
      this.setState(
        prevState => {
          return { [stat]: prevState[stat] + amt, actionsLeft: checkActions };
        },
        () => this.checkStatus()
      );
      if (amt < 0) {
        this.reportAction(`You lost ${amt} ${stat}`);
      } else {
        this.reportAction(`You've gained ${amt} ${stat}`);
      }
    } else if (this.state.actionsLeft === "💀") {
      this.reportAction("You are dead.");
    } else {
      this.reportAction("You are too tired to do that.");
    }
  };

  randomAmount = () => {
    return Math.floor((Math.random() * 10) / 2);
  };

  takeRest = () => {
    if (this.state.actionsLeft === 0) {
      this.setState(prevState => {
        return {
          actionsLeft: maxActions,
          currentHp: Math.min(
            this.state.maxHp,
            prevState.currentHp + prevState.maxHp / 2
          )
        };
      });
      this.reportAction("You slept great!");
    } else if (this.state.actionsLeft === "💀") {
      this.reportAction("You are dead.");
    } else {
      this.reportAction("You aren't tired.");
    }
  };

  increaseStr = () => {
    let amount = this.randomAmount();
    this.modifyStat("str", amount);
  };

  increaseDex = () => {
    let amount = this.randomAmount();
    this.modifyStat("dex", amount);
  };

  increaseLck = () => {
    let amount = this.randomAmount();
    this.modifyStat("lck", amount);
  };

  increaseAppr = () => {
    let amount = this.randomAmount();
    this.modifyStat("appr", amount);
  };

  increaseMoney = () => {
    let amount = this.randomAmount() * 3;
    this.modifyStat("money", amount);
  };

  startCombat = () => {
    this.setState(
      prevState => {
        return { inCombat: true };
      },
      () => this.fightEnemy()
    );
  };

  fightEnemy = () => {
    this.takeAction();
    if (this.state.actionsLeft > 0) {
      let enemy = enemyList[this.rollStat(enemyList.length)];
      this.reportAction(`You found a ${enemy.name}!`);
      let rollStr = this.rollStat(this.state.str);
      if (rollStr > enemy.str) {
        setTimeout(
          () => this.reportAction(`You defeated the ${enemy.name}!`),
          1000
        );
        setTimeout(() => this.modifyStat("money", enemy.loot), 2000);
        // let rollLoot = Math.floor(Math.random() * this.state.lck);
        // if (rollLoot >= enemy.treasureChance) {
        //   this.inventory.push(enemy.treasure);
        //   this.reportAction(`You gained a ${enemy.treasure.name}!`);
        // }
      } else {
        setTimeout(() => this.reportAction(`You lost to ${enemy.name}!`), 1000);
        setTimeout(() => this.modifyStat("currentHp", enemy.str * -1), 2000);
      }
    } else if (this.state.actionsLeft === "💀") {
      this.reportAction("You are dead.");
    } else {
      this.reportAction("You are too tired to do that");
    }
    setTimeout(
      () =>
        this.setState(prevState => {
          return { inCombat: false };
        }),
      2000
    );
  };

  changeTabs = () => {
    let tabToGo = "";
    let tabText = "";
    if (this.state.currentTab === "baseActions") {
      tabToGo = "shops";
      tabText = "Go Back";
    } else {
      tabToGo = "baseActions";
      tabText = "Go to Shop";
    }
    this.setState(prevState => {
      return {
        currentTab: tabToGo,
        changeTabText: tabText
      };
    });
  };

  render() {
    return (
      <div className="App">
        <h1 className="header">
          <span>🗡️</span>
          Fantasy Sim
        </h1>
        <div className="flex-container">
          <Stats stats={this.state} inventory={this.inventory} />
          <ActionBar
            isAlive={this.state.isAlive}
            actionsLeft={this.state.actionsLeft}
            takeRest={this.takeRest}
            increaseStr={this.increaseStr}
            increaseDex={this.increaseDex}
            increaseLck={this.increaseLck}
            increaseAppr={this.increaseAppr}
            increaseMoney={this.increaseMoney}
            startCombat={this.startCombat}
            currentTab={this.state.currentTab}
            changeTabs={this.changeTabs}
            changeTabText={this.state.changeTabText}
            inCombat={this.state.inCombat}
          />
          <ActionLog actions={this.actions} />
        </div>
      </div>
    );
  }
}

export default App;
