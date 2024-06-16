"use client";

import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { User } from "../contexts/UserContext";
import Warning from "../components/Warning";
import getAllApplications from "../database/getAllApplications";
import PieGraph from "../components/PieGraph";
import BarGraph from "../components/BarGraph";
import Legend from "../components/Legend";
import Table from "../components/Table";
import updateApplication from "../database/updateApplication";
import { PRIMARY_COLOR } from "../constants";

export default function Admin() {
  const { currentUser } = useContext(User);

  const isMobile = useMediaQuery("(max-width: 940px)");

  const [loading, setLoading] = useState(true);

  const [applications, setApplications] = useState(null);
  const [applicationsPieData, setApplicationsPieData] = useState([
    { x: "Rejected", y: 50 },
    { x: "Approved", y: 50 }
  ]);
  const [statusesPieData, setStatusesPieData] = useState([
    { x: "Rejected", y: 25 },
    { x: "Interview Requested", y: 25 },
    { x: "Under Review", y: 25 },
    { x: "Approved", y: 25 }
  ]);
  const [applicationsBarData, setApplicationsBarData] = useState([
    { x: 1, y: 0, label: "Back End Developer" },
    { x: 2, y: 0, label: "Front End Developer" },
    { x: 3, y: 0, label: "Lead Software Engineer" },
    { x: 4, y: 0, label: "Marketing Specialist" },
    { x: 5, y: 0, label: "Delivery Driver" },
    { x: 6, y: 0, label: "Customer Service Representative" },
  ]);

  useEffect(() => {
    async function getDetails() {
      setLoading(true)
      let tempApplications = []
      const { applicationsResult, applicationsError } = await getAllApplications();
      applicationsResult.forEach((doc) => {
        tempApplications = [...tempApplications, doc.data()]
      })
      setApplications(tempApplications)
      let approvedCount = 0;
      let tempApplicationBarData = [
        { y: 0, position: "Back End Developer" },
        { y: 0, position: "Front End Developer" },
        { y: 0, position: "Lead Software Engineer" },
        { y: 0, position: "Marketing Specialist" },
        { y: 0, position: "Delivery Driver" },
        { y: 0, position: "Customer Service Representative" }
      ];
      let tempApplicationStatusesData = [
        { x: "Rejected", y: 0 },
        { x: "Interview Requested", y: 0 },
        { x: "Under Review", y: 0 },
        { x: "Approved", y: 0 }
      ];
      let selIdx = -1;
      let selIdx2 = -1;
      for (const app of tempApplications) {
        if (app.approvedByATS) approvedCount++;
        selIdx = tempApplicationBarData.indexOf(tempApplicationBarData.filter((item) => {
          return item.position === app.positionTitle
        })[0]);
        selIdx2 = tempApplicationStatusesData.indexOf(tempApplicationStatusesData.filter((item) => {
          return item.x === app.applicationStatus
        })[0]);
        tempApplicationBarData[selIdx].y += 1;
        tempApplicationStatusesData[selIdx2].y += 1 / tempApplications.length;
      }
      setApplicationsPieData([
        { x: "Approved", y: approvedCount / tempApplications.length },
        { x: "Rejected", y: (tempApplications.length - approvedCount) / tempApplications.length }
      ]);
      setApplicationsBarData(tempApplicationBarData);
      setStatusesPieData(tempApplicationStatusesData);
      setLoading(false);
    }
    getDetails();
  }, [currentUser])

  if (currentUser !== "deyanik2007@gmail.com") return <Warning message="You must be an admin to access this page." />

  return (
    <main>
      <div style={{ padding: 30 }}>
        <h5 style={{ fontSize: 30 }}> Dashboard </h5>
        <h5 style={{ fontSize: 20, marginTop: 30 }}> Metrics </h5>
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between"
        }}>
          <div style={{
            marginTop: 20,
            width: isMobile ? "100%" : "22.5%",
            boxShadow: "0px 0px 10px #ccc",
            padding: 20,
            minHeight: 400
          }}>
            <h5> ATS Decisions </h5>
            <Legend
              data={[
                { category: "Approved", color: "#48cf71" },
                { category: "Rejected", color: "tomato" }
              ]} />
            <PieGraph
              containerStyle={{
                width: "100%",
                height: "75%",
                padding: 0
              }}
              data={applicationsPieData}
              colorScale={["#48cf71", "tomato"]}
              style={{
                labels: {
                  fontSize: 15,
                  // fontFamily: "'Poppins', sans-serif"
                }
              }}
              radius={125} />
          </div>
          <div style={{
            marginTop: 20,
            marginLeft: 0,
            width: isMobile ? "100%" : "50%",
            boxShadow: "0px 0px 10px #ccc",
            minHeight: "100%",
            padding: 20
          }}>
            <h5> Application Job Distribution </h5>
            <BarGraph
              containerStyle={{
                height: "100%",
              }}
              x={"position"}
              style={{
                data: {
                  opacity: 1,
                  fill: "#4287f5"
                },
                labels: {
                  fontSize: 5,
                  fontFamily: "'Poppins', sans-serif"
                }
              }}
              data={applicationsBarData}
              isMobile={isMobile}
            />
          </div>
          <div style={{
            marginTop: 20,
            width: isMobile ? "100%" : "22.5%",
            boxShadow: "0px 0px 10px #ccc",
            padding: 20
          }}>
            <h5> Application Statuses </h5>
            <Legend
              data={[
                { category: "Approved", color: PRIMARY_COLOR },
                { category: "Interview Requested", color: "#48cf71" },
                { category: "Rejected", color: "tomato" },
                { category: "Under Review", color: "#4287f5" }
              ]} />
            <PieGraph
              containerStyle={{
                width: "100%",
                height: "60%",
                padding: 0
              }}
              data={statusesPieData}
              colorScale={["tomato", "#48cf71", "#4287f5", PRIMARY_COLOR]}
              style={{
                labels: {
                  fontSize: 15,
                  // fontFamily: "'Poppins', sans-serif"
                }
              }}
              radius={125} />
          </div>
        </div>
        <h5 style={{ fontSize: 20, marginTop: 40 }}> Applications </h5>
        <Table
          columns={[
            { name: 'Name', columnKey: 'applicantFullName', editable: false, link: false },
            { name: 'Email', columnKey: 'applicantEmail', editable: false, link: false },
            { name: 'Resume', columnKey: 'applicantResume', editable: false, link: true },
            { name: 'Position', columnKey: 'positionTitle', editable: false, link: false },
            {
              name: 'Status', columnKey: 'applicationStatus', editable: true, link: false,
              editType: "dropdown",
              dropdownOptions: [
                { name: "apprv", displayValue: "Approved" },
                { name: "intreq", displayValue: "Interview Requested" },
                { name: "rejec", displayValue: "Rejected" },
                { name: "undrev", displayValue: "Under Review" }
              ],
              onChangeCallback: updateApplication
            }
          ]}
          data={applications ? applications : []}
          keyIdentifier={"id"}
          pageSize={4} 
          isMobile={isMobile}/>
      </div>
    </main>
  )
}
