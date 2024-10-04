import {
  AccessTimeFilledRounded,
  AccessTimeOutlined,
  AccountCircleOutlined,
  AccountCircleRounded,
  AddCircleOutline,
  AddCircleRounded,
  PersonOutline,
  PersonRounded,
} from "@mui/icons-material";
import { createTabItem } from "./utils/createTabItem";

// Import images
import biogesicImage from "./assets/BIOGESIC.svg"; // Update the path as necessary
import bonamineImage from "./assets/BONAMINE.svg"; // Update the path as necessary
import kremilsImage from "./assets/KREMIL-S.svg"; // Update the path as necessary

const appConfig = {
  appName: "PILL STOP",
  captions: {
    tagLine: "Your medicine, anytime.",
    signIn: "Please sign in to continue.",
    notAStudent: "Not a student?",
    notAnAdmin: "Not an admin?",
    accountDetails: "Account Details", // New caption for Account page
    feeling: "How are you feeling?",
  },
  medicines: {
    biogesic: {
      name: "Biogesic",
      genericName: "Paracetamol",
      image: biogesicImage, // Add image source
      symptoms: [
        "Fever (Lagnat)",
        "Headache (Sakit ng ulo)",
        "Muscle aches (Paninikip ng kalamnan)",
        "Toothache (Sakit ng ngipin)",
        "Menstrual cramps (Sakit ng tiyan tuwing buwanang dalaw)",
        "Backache (Sakit sa likod)",
        "Sore throat (Masakit na lalamunan)",
        "Cold symptoms (Sintomas ng sipon)",
      ],
    },
    bonamine: {
      name: "Bonamine",
      genericName: "Dimenhydrinate",
      image: bonamineImage, // Add image source
      symptoms: [
        "Nausea (Nausea)",
        "Vomiting (Pagsusuka)",
        "Dizziness (Nahihilo)",
        "Motion sickness (Sakit sa biyahe)",
        "Vertigo (Sakit ng ulo na may pag-ikot)",
        "Tinnitus (Ingay sa tainga)",
        "Drowsiness (Pagkaantok)",
      ],
    },
    kremils: {
      name: "Kremil-S",
      genericName: "Aluminum Hydroxide + Magnesium Hydroxide",
      image: kremilsImage, // Add image source
      symptoms: [
        "Heartburn (pananakit ng sikmura)",
        "Acid indigestion (Asidik na pagsisikip ng tiyan)",
        "Upset stomach (Masakit na tiyan)",
        "Gas (Flatulence)",
        "Bloating (Pamamaga ng tiyan)",
        "Nausea (Naduduwal)",
      ],
    },
  },
  buttonLabels: {
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    login: "Sign In",
    adminLogin: "Admin Login", // New label for Admin Login
    editProfile: "Edit Profile", // New label for Edit Profile button
  },
  formFields: {
    username: "Username",
    password: "Password",
    firstName: "First Name",
    middleName: "Middle Name",
    lastName: "Last Name",
    birthdate: "Birthday",
    studentNumber: "Student Number",
    department: "Association",
    medicalHistory: "Medical History",
    allergies: "Allergies",
    emergencyContact: "Emergency Contact Name",
    relationship: "Relationship",
    contactNumber: "Emergency Contact Number",
  },
  formSections: {
    personalInfo: "Personal Information",
    academicInfo: "Academic Information",
    medicalInfo: "Medical Information",
  },
  userRoles: ["Admin", "User", "Guest"],
  apiEndpoints: {
    index: "/api",
    studentLogin: "/login/student",
    adminLogin: "/login/admin",
    requestMedicine: "/medicine-requests",
    medicine: "/medicine",
    student: "/student",
    admin: "/admin",
  },
  sessionKeys: {
    token: "TOKEN",
    user: "USER",
    students: "STUDENTS",
    medicine: "MEDICINE",
  },
  navItems: {
    users: createTabItem("Users", <PersonOutline />, <PersonRounded />),
    requests: createTabItem(
      "Requests",
      <AddCircleOutline />,
      <AddCircleRounded />
    ),
    home: createTabItem(
      "History",
      <AccessTimeOutlined />,
      <AccessTimeFilledRounded />
    ),
    account: createTabItem(
      "Account",
      <AccountCircleOutlined />,
      <AccountCircleRounded />
    ),
  },
};

export default appConfig;
