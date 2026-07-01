import Image from "next/image";
import StudentRegistrationForm from "./components/StudentRegistrationForm";
import StudentList from "./components/StudentList";

export default function Home() {
  return (
    <>
    <StudentRegistrationForm/>
    <StudentList/>
    </>
  );
}
