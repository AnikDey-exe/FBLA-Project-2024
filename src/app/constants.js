export const COMPANY_NAME = "ExpressEats"
export const PRIMARY_COLOR = "#51a691"
export const benefits = [
    {
        title: 'Unlimited PTO',
        description: "Enjoy your vacation with zero hassle and don't worry about getting sick. You will be paid on your time off.",
        image: 'vacationb.jpg'
    },
    {
        title: 'Medical Insurance',
        description: "We will cover your medical costs and emergencies.",
        image: 'insuranceb.jpg'
    },
    {
        title: '401K',
        description: "Live a stress free retirement and live in luxury.",
        image: 'retirementb.jpg'
    }
]

export const expandedBenefits = [
    {
        sectionTitle: 'Insurance',
        sectionImage: 'policy.png',
        sectionInfo: [
            'We offer top of the line insurance benefits',
            'We provide life insurance, disability insurance, and health insurance'
        ]
    },
    {
        sectionTitle: 'Time Off',
        sectionImage: 'summer.png', 
        sectionInfo: [
            'We highly value work-life balance',
            'We offer unlimited paid time off to all of our employees',
            'For our parents, we also offer maternal and paternal leave'
        ]
    },
    {
        sectionTitle: 'Growth',
        sectionImage: 'teamwork.png',
        sectionInfo: [
            'We believe growth is essential to our company and can benefit employees immensely',
            'We deliver many promotion opportunities',
            'Employees receive a raise at least once a year',
            'We hold mental health days at least two times a week'
        ]
    },
    {
        sectionTitle: 'Retirement',
        sectionImage: 'book.png',
        sectionInfo: [
            'We offer retirement benefits as well to ensure a smooth transition to retirement',
            'We offer a 401(k) plan to all of our employees'
        ]
    },
    {
        sectionTitle: 'Other Benefits',
        sectionImage: 'network.png',
        sectionInfo: [
            'All equipment required for the job is provided to you during the onboarding process',
            'We provide an extensive training and development program to new hires in order to make them well prepared for their role',
            'Each year, we hold a raffle where employees can win all sorts of prizes'
        ]
    }
]

export const creditedImages = [
    'https://www.freepik.com/free-photo/paper-bag-with-vegetables_889655.htm',
    'https://unsplash.com/photos/person-holding-black-android-smartphone-ET29IV1yQiE',
    'https://unsplash.com/photos/woman-sits-on-brown-wooden-beach-chair-jL6PTWI7h18',
    'https://unsplash.com/photos/man-woman-and-child-holding-hands-on-seashore-SIOdjcYotms',
    'https://unsplash.com/photos/2-men-standing-on-green-grass-field-near-body-of-water-during-daytime-SwK6MSxTLDE',
    'https://unsplash.com/photos/black-calculator-beside-black-pen-on-white-printer-paper-I3HPUolh5hA',
    'https://unsplash.com/photos/six-white-sticky-notes--1_RZL8BGBM',
    'https://unsplash.com/photos/three-stainless-steel-forks-near-apple-wMzx2nBdeng'
]

export const creditedSources = [
    'https://resources.workable.com/tutorial/employee-benefits-guide',
    'https://www.forbes.com/advisor/business/employee-benefits/',
    'https://www.ziprecruiter.com/Salaries/What-Is-the-Average-Marketing-Salary-by-State',
    'https://mint.intuit.com/salary/food-delivery-driver/ga',
    'https://www.payscale.com/research/US/Job=Lead_Software_Engineer/Salary',
    'https://www.indeed.com/career/front-end-developer/salaries',
    'https://www.indeed.com/career/customer-service-representative/salaries/Dallas--TX',
    'https://www.ziprecruiter.com/Salaries/BACK-END-Developer-Salary#Yearly'
]

const yellow200 = "#FFF59D";
const deepOrange600 = "#F4511E";
const lime300 = "#DCE775";
const lightGreen500 = "#8BC34A";
const teal700 = "#00796B";
const cyan900 = "#006064";
const colors = [
  deepOrange600,
  yellow200,
  lime300,
  lightGreen500,
  teal700,
  cyan900
];
const blueGrey50 = "#ECEFF1";
const blueGrey300 = "#90A4AE";
const blueGrey700 = "#455A64";
const grey900 = "#212121";
// *
// * Typography
// *
const sansSerif = "'Poppins', sans-serif";
const letterSpacing = "normal";
const fontSize = 12;
// *
// * Layout
// *
const padding = 8;
const baseProps = {
  width: 350,
  height: 350,
  padding: 50
};
// *
// * Labels
// *
const baseLabelStyles = {
  fontFamily: "'Poppins', sans-serif",
  fontSize,
  letterSpacing,
  padding,
  fill: blueGrey700,
  stroke: "transparent",
  strokeWidth: 0
};

const centeredLabelStyles = Object.assign({ textAnchor: "middle" }, baseLabelStyles);
// *
// * Strokes
// *
const strokeDasharray = "10, 5";
const strokeLinecap = "round";
const strokeLinejoin = "round";

export const custom = {
  area: Object.assign(
    {
      style: {
        data: {
          fill: grey900
        },
        labels: baseLabelStyles
      }
    },
    baseProps
  ),
  axis: Object.assign(
    {
      style: {
        axis: {
          fill: "transparent",
          stroke: blueGrey300,
          strokeWidth: 2,
          strokeLinecap,
          strokeLinejoin
        },
        axisLabel: Object.assign({}, centeredLabelStyles, {
          padding,
          stroke: "transparent"
        }),
        grid: {
          fill: "none",
          stroke: blueGrey50,
          strokeDasharray,
          strokeLinecap,
          strokeLinejoin,
          pointerEvents: "painted"
        },
        ticks: {
          fill: "transparent",
          size: 5,
          stroke: blueGrey300,
          strokeWidth: 1,
          strokeLinecap,
          strokeLinejoin
        },
        tickLabels: Object.assign({}, baseLabelStyles, {
          fill: blueGrey700
        })
      }
    },
    baseProps
  ),
  polarDependentAxis: Object.assign({
    style: {
      ticks: {
        fill: "transparent",
        size: 1,
        stroke: "transparent"
      }
    }
  }),
  bar: Object.assign(
    {
      style: {
        data: {
          fill: blueGrey700,
          padding,
          strokeWidth: 0
        },
        labels: baseLabelStyles
      }
    },
    baseProps
  ),
  boxplot: Object.assign(
    {
      style: {
        max: { padding, stroke: blueGrey700, strokeWidth: 1 },
        maxLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
        median: { padding, stroke: blueGrey700, strokeWidth: 1 },
        medianLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
        min: { padding, stroke: blueGrey700, strokeWidth: 1 },
        minLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
        q1: { padding, fill: blueGrey700 },
        q1Labels: Object.assign({}, baseLabelStyles, { padding: 3 }),
        q3: { padding, fill: blueGrey700 },
        q3Labels: Object.assign({}, baseLabelStyles, { padding: 3 })
      },
      boxWidth: 20
    },
    baseProps
  ),
  candlestick: Object.assign(
    {
      style: {
        data: {
          stroke: blueGrey700
        },
        labels: Object.assign({}, baseLabelStyles, { padding: 5 })
      },
      candleColors: {
        positive: "#ffffff",
        negative: blueGrey700
      }
    },
    baseProps
  ),
  chart: baseProps,
  errorbar: Object.assign(
    {
      borderWidth: 8,
      style: {
        data: {
          fill: "transparent",
          opacity: 1,
          stroke: blueGrey700,
          strokeWidth: 2
        },
        labels: baseLabelStyles
      }
    },
    baseProps
  ),
  group: Object.assign(
    {
      colorScale: colors
    },
    baseProps
  ),
  histogram: Object.assign(
    {
      style: {
        data: {
          fill: blueGrey700,
          stroke: grey900,
          strokeWidth: 2
        },
        labels: baseLabelStyles
      }
    },
    baseProps
  ),
  legend: {
    colorScale: colors,
    gutter: 10,
    orientation: "vertical",
    titleOrientation: "top",
    style: {
      data: {
        type: "circle"
      },
      labels: baseLabelStyles,
      title: Object.assign({}, baseLabelStyles, { padding: 5 })
    }
  },
  line: Object.assign(
    {
      style: {
        data: {
          fill: "transparent",
          opacity: 1,
          stroke: blueGrey700,
          strokeWidth: 2
        },
        labels: baseLabelStyles
      }
    },
    baseProps
  ),
  pie: Object.assign(
    {
      colorScale: colors,
      style: {
        data: {
          padding,
          stroke: blueGrey50,
          strokeWidth: 1
        },
        labels: Object.assign({}, baseLabelStyles, { padding: 20 })
      }
    },
    baseProps
  ),
  scatter: Object.assign(
    {
      style: {
        data: {
          fill: blueGrey700,
          opacity: 1,
          stroke: "transparent",
          strokeWidth: 0
        },
        labels: baseLabelStyles
      }
    },
    baseProps
  ),
  stack: Object.assign(
    {
      colorScale: colors
    },
    baseProps
  ),
  tooltip: {
    style: Object.assign({}, baseLabelStyles, { padding: 0, pointerEvents: "none" }),
    flyoutStyle: {
      stroke: grey900,
      strokeWidth: 1,
      fill: "#f0f0f0",
      pointerEvents: "none"
    },
    flyoutPadding: 5,
    cornerRadius: 5,
    pointerLength: 10
  },
  voronoi: Object.assign(
    {
      style: {
        data: {
          fill: "transparent",
          stroke: "transparent",
          strokeWidth: 0
        },
        labels: Object.assign({}, baseLabelStyles, {
          padding: 5,
          pointerEvents: "none"
        }),
        flyout: {
          stroke: grey900,
          strokeWidth: 1,
          fill: "#f0f0f0",
          pointerEvents: "none"
        }
      }
    },
    baseProps
  )
};

/*
    Documentation: 

    Images:
    https://unsplash.com/photos/person-holding-black-android-smartphone-ET29IV1yQiE
    https://unsplash.com/photos/black-calculator-beside-black-pen-on-white-printer-paper-I3HPUolh5hA
    https://unsplash.com/photos/six-white-sticky-notes--1_RZL8BGBM
    

    FlatIcons:
    Sonnycandra
    Chattapat

    Do research on:
    Company benefits
    Salaries for positions listed on website

    Documentation: 
    <a href="https://www.freepik.com/free-photo/paper-bag-with-vegetables_889655.htm#query=grocery%20bag%20png&position=5&from_view=keyword&track=ais&uuid=e6800ee9-7bf5-4c15-bba0-18a0dac6cf29">Image by onlyyouqj</a> on Freepik

    Sources:
    https://resources.workable.com/tutorial/employee-benefits-guide 
    https://www.forbes.com/advisor/business/employee-benefits/  
    https://www.ziprecruiter.com/Salaries/What-Is-the-Average-Marketing-Salary-by-State 
    https://mint.intuit.com/salary/food-delivery-driver/ga
    https://www.payscale.com/research/US/Job=Lead_Software_Engineer/Salary
    https://www.indeed.com/career/front-end-developer/salaries
    https://www.indeed.com/career/customer-service-representative/salaries/Dallas--TX
    https://www.ziprecruiter.com/Salaries/BACK-END-Developer-Salary#Yearly

    Email api route (not in use): 
*/