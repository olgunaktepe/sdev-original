import React from "react";
import { Metadata } from "next";
import Statistics from "./Statistics";
import Statistics2 from "./Statistics2";
import Statistics3 from "./Statistics3";
import ProfileCard from "./ProfileCard";
import WeatherWidget from "./WeatherWidget";
import StatisticsChartWidget2 from "./StatisticsChartWidget2";
import StatisticsChartWidget3 from "./StatisticsChartWidget3";
import StatisticsChartWidget4 from "./StatisticsChartWidget4";
import StatisticsChartWidget5 from "./StatisticsChartWidget5";
import StatisticsChartWidget6 from "./StatisticsChartWidget6";
import StatisticsChartWidget7 from "./StatisticsChartWidget7";

// components
import  PageBreadcrumb from "@/components/PageBreadcrumb";
import StatisticsChartWidget  from "@/components/StatisticsChartWidget";
import StatisticsWidget  from "@/components/StatisticsWidget";
import Messages  from "@/components/Messages";
import ChatList  from "@/components/ChatList";
import TodoList  from "@/components/TodoList";

// images
import user1 from "@/assets/images/users/avatar-1.jpg";
import user2 from "@/assets/images/users/avatar-2.jpg";
import user3 from "@/assets/images/users/avatar-3.jpg";
import user4 from "@/assets/images/users/avatar-4.jpg";

// dummy data
import { weather, chatMessages } from "./data";

export const metadata: Metadata = {
  title: "Widgets",
}

const Widgets = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Components", path: "/apps/widgets" },
          { label: "Widgets", path: "/apps/widgets", active: true },
        ]}
        title={"Widgets"}
      />

      <div className="row">
        <div className="col-xl-3 col-md-6">
          <Statistics
            variant="success"
            description="Total Sales today"
            stats="2562"
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <Statistics
            variant="primary"
            description="Daily visitors"
            stats="5685"
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <Statistics
            variant="pink"
            description="Total Earning"
            counterOptions={{
              prefix: "$ ",
            }}
            stats="12480"
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <Statistics
            variant="purple"
            description="Pending Orders"
            stats="62"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-3 col-md-6">
          <Statistics2
            variant="success"
            description="Today's Visits"
            icon="mdi mdi-android-studio"
            stats="64570"
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <Statistics2
            variant="primary"
            description="Total Revenue"
            icon="mdi mdi-amazon"
            stats="31570"
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <Statistics2
            variant="danger"
            description="Today's Sales"
            icon="mdi mdi-apple"
            stats="280"
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <Statistics2
            variant="purple"
            description="Conversion"
            icon="mdi mdi-barley"
            counterOptions={{
              suffix: "%",
              decimals: 2,
            }}
            stats="0.16"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-3 col-md-6">
          <Statistics2
            variant="info"
            description="Today's Visits"
            icon="mdi mdi-black-mesa"
            stats="23570"
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <Statistics2
            variant="warning"
            description="Total Revenue"
            icon="mdi mdi-bullseye"
            stats="9654"
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <Statistics2
            variant="dark"
            description="Today's Sales"
            icon="mdi mdi-cart"
            stats="965"
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <Statistics2
            variant="pink"
            description="Conversion"
            icon="mdi mdi-clock"
            counterOptions={{
              suffix: "%",
              decimals: 2,
            }}
            stats="0.65"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-3 col-md-6">
          <StatisticsChartWidget
            hasHeader
            title={"New Customers"}
            color={"#f05050"}
            data={58}
            stats={"268"}
            description={"Since last week"}
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <StatisticsChartWidget
            hasHeader
            title={"Online Orders"}
            color={"#675db7"}
            data={80}
            stats={"8715"}
            description={"Since last month"}
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <StatisticsChartWidget
            hasHeader
            title={"Revenue"}
            color={"#23b397"}
            data={77}
            stats={"$925"}
            description={"This week"}
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <StatisticsChartWidget
            hasHeader
            title={"Daily Average"}
            color={"#ffbd4a"}
            data={35}
            stats={"$78.58"}
            description={"Revenue today "}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-3 col-md-6">
          <StatisticsWidget
            icon="ri-stack-line"
            stats="865"
            title="Campaign Sent"
            trend={{
              value: "5.27%",
              title: "Since last month",
              icon: "mdi mdi-arrow-up-bold",
              variant: "success",
            }}
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <StatisticsWidget
            icon="ri-slideshow-2-line"
            stats="384"
            title="New Leads"
            trend={{
              value: "3.27%",
              title: "Since last month",
              icon: "mdi mdi-arrow-down-bold",
              variant: "danger",
            }}
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <StatisticsWidget
            icon="ri-hand-heart-line"
            stats="34521"
            title="Deals"
            trend={{
              value: "8.58%",
              title: "Since last month",
              icon: "mdi mdi-arrow-up-bold",
              variant: "success",
            }}
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <StatisticsWidget
            icon="ri-money-dollar-box-line"
            stats="89357"
            title="Booked Revenue"
            counterOptions={{
              prefix: "$",
            }}
            trend={{
              value: "34.61%",
              title: "Since last month",
              icon: "mdi mdi-arrow-up-bold",
              variant: "success",
            }}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-3 col-md-6">
          <ProfileCard
            avatar={user1.src}
            name="Chadengle"
            email="coderthemes@gmail.com"
            role="Admin"
            variant="warning"
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <ProfileCard
            avatar={user2.src}
            name="Tomaslau"
            email="coderthemes@gmail.com"
            role="User"
            variant="success"
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <ProfileCard
            avatar={user3.src}
            name="Stillnotdavid"
            email="coderthemes@gmail.com"
            role="Admin"
            variant="pink"
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <ProfileCard
            avatar={user4.src}
            name="Arashasghari"
            email="coderthemes@gmail.com"
            role="User"
            variant="info"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-3 col-md-6">
          <Statistics3
            icon="mdi mdi-coffee"
            variant="primary"
            title="New User"
            stats="8541"
            trend={{
              value: "39% Up",
              variant: "success",
            }}
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <Statistics3
            icon="mdi mdi-contrast-circle"
            variant="warning"
            title="New ORDERS"
            stats="6521"
            trend={{
              value: "56% Down",
              variant: "danger",
            }}
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <Statistics3
            icon="mdi mdi-crown"
            variant="success"
            title="Bug Reports"
            stats="1452"
            trend={{
              value: "0%",
              variant: "info",
            }}
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <Statistics3
            icon="mdi mdi-download"
            variant="pink"
            title="Total Downloads"
            stats="562"
            trend={{
              value: "39% Up",
              variant: "success",
            }}
          />
        </div>
      </div>

      {/* weather */}
      <div className="row">
        {(weather || []).map((item, index) => {
          return (
            <div className="col-xl-6" key={index}>
              <WeatherWidget item={item} />
            </div>
          );
        })}
      </div>

      <div className="row">
        <div className="col-xs-12">
          <h4 className="mb-3">Chart Widgets</h4>

          <div className="row">
            <div className="col-xl-4">
              <StatisticsChartWidget2 />
            </div>
            <div className="col-xl-4">
              <StatisticsChartWidget3 />
            </div>
            <div className="col-xl-4">
              <StatisticsChartWidget4 />
            </div>
          </div>

          <div className="row">
            <div className="col-xl-4">
              <StatisticsChartWidget5 />
            </div>
            <div className="col-xl-4">
              <StatisticsChartWidget6 />
            </div>
            <div className="col-xl-4">
              <StatisticsChartWidget7 />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <h4 className="mb-3">Chart Widgets</h4>
          <div className="row">
            <div className="col-xl-4">
              <Messages />
            </div>
            <div className="col-xl-4">
              <ChatList title="Chat" messages={chatMessages} />
            </div>
            <div className="col-xl-4">
              <TodoList addTodo={true} height={"310px"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Widgets;
