"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { base_url } from "@/constant/constants";
import * as LR from "@uploadcare/blocks";
import { useRef, useEffect } from "react";
LR.registerBlocks(LR);
export default function AddSchool() {
  let [schoolName, setSchoolName] = useState("");
  let [schoolAddress, setSchoolAddress] = useState("");
  let [schoolState, setSchoolState] = useState("");
  let [schoolCity, setSchoolCity] = useState("");
  let [schoolEmail, setSchoolEmail] = useState("");
  let [schoolContactNumber, setSchoolContactNumber] = useState("");
  const ctxProviderRef = useRef(null);
  let [schoolImageId, setSchoolImageId] = useState(null);
  let router = useRouter();
  useEffect(() => {
    const ctxProvider = ctxProviderRef.current;
    if (!ctxProvider) return;

    const handleChangeEvent = (event) => {
      let imageInfo = event.detail.allEntries[0];
      setSchoolImageId(`${imageInfo.uuid}`);
    };

    ctxProvider.addEventListener("change", handleChangeEvent);

    return () => {
      ctxProvider.removeEventListener("change", handleChangeEvent);
    };
  }, [setSchoolImageId]);
  async function addSchool(e) {
    e.preventDefault();

    let localUserData = localStorage.getItem("userData");
    localUserData = JSON.parse(localUserData);
    let userData = await fetch(`${base_url}/api/users/${localUserData.email}`, {
      cache: "no-cache",
    });

    if (userData) {
      userData = await userData.json();
      let userId = userData.id;
      let presentSchoolDataInDatabase = await fetch(`${base_url}/api/schools`, {
        cache: "no-cache",
      });
      presentSchoolDataInDatabase = await presentSchoolDataInDatabase.json();
      let addSchoolData = await fetch(`${base_url}/api/schools`, {
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify({
          schoolName,
          schoolAddress,
          schoolState,
          schoolCity,
          schoolEmail,
          schoolContactNumber,
          schoolImageId,
          userId,
          presentSchoolDataInDatabase,
        }),
      });

      addSchoolData = await addSchoolData.json();
      if (addSchoolData.dataPresent) {
        alert(
          "SchoolData you provided aready present. Please check your school-Address, school-Email , school-ContactNumber"
        );
        setSchoolName("");
        setSchoolAddress("");
        setSchoolCity("");
        setSchoolState("");
        setSchoolContactNumber("");
        setSchoolEmail("");
        setSchoolImageUrl("");
        router.push("/addSchool");
      } else {
        let schoolAdded = localUserData.schoolAdded;
        schoolAdded = true;
        let email = localUserData.email;
        let name = localUserData.name;
        localStorage.setItem(
          "userData",
          JSON.stringify({ email, name, schoolAdded })
        );
        router.push("/");
      }
    } else {
      alert("something went wrong!!!");
      router.push("/");
    }
  }

  // const handleFileChange = (event) => {
  //   const selectedFile = event.target.files[0];
  //   let schoolData = {
  //     name: selectedFile.name,
  //     type: selectedFile.type,
  //     size: selectedFile.size,
  //     path: "public/schoolImages",
  //   };
  //   schoolData = JSON.stringify(schoolData);
  //   setSchoolImageDataInString(schoolData);
  //   setSchoolImage(selectedFile);
  // };
  return (
    <>
      <div className="container mx-auto px-4">
        <Card className="w-full sm:max-w-md md:max-w-lg py-4 bg-blue-300 ">
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <h1 className=" text-base lg:text-lg text-slate-500 font-bold">
                  Add a new school
                </h1>
                <p className="text-base lg:text-lg text-slate-500 font-bold">
                  Enter the school information below.
                </p>
              </div>
              <form onSubmit={addSchool}>
                <div className="my-1">
                  <Label
                    htmlFor="school-name"
                    className="text-slate-600 font-bold"
                  >
                    School name
                  </Label>
                  <Input
                    name="schoolName"
                    type="text"
                    placeholder="Enter the school name"
                    title="Enter the correct School Name"
                    pattern="[A-Za-z ]*"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    required
                  />
                </div>
                <div className="my-1">
                  <Label htmlFor="address" className="text-slate-600 font-bold">
                    Address
                  </Label>
                  <Input
                    name="schoolAddress"
                    type="text"
                    placeholder="Enter the address"
                    // pattern="\d{1,5}\s\w. \s(\b\w*\b\s){1,2}\w*\"
                    title="Enter right Address"
                    value={schoolAddress}
                    onChange={(e) => setSchoolAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="my-1">
                  <Label htmlFor="city" className="text-slate-600 font-bold">
                    City
                  </Label>
                  <Input
                    name="schoolCity"
                    type="text"
                    placeholder="Enter the city"
                    title="Enter the correct School City"
                    pattern="[A-Za-z ]*"
                    value={schoolCity}
                    onChange={(e) => setSchoolCity(e.target.value)}
                    required
                  />
                </div>
                <div className="my-1">
                  <Label htmlFor="state" className="text-slate-600 font-bold">
                    State
                  </Label>
                  <Input
                    name="schoolState"
                    type="text"
                    placeholder="Enter the state"
                    title="Enter the correct School State"
                    pattern="[A-Za-z ]*"
                    value={schoolState}
                    onChange={(e) => setSchoolState(e.target.value)}
                    required
                  />
                </div>
                <div className="my-1">
                  <Label
                    htmlFor="contact-number"
                    className="text-slate-600 font-bold"
                  >
                    Contact number
                  </Label>
                  <Input
                    name="contactNumber"
                    placeholder="Enter the contact number"
                    type="text"
                    pattern="^\d{10}$"
                    title="fill only 10 digits"
                    value={schoolContactNumber}
                    onChange={(e) => setSchoolContactNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="my-1">
                  <Label htmlFor="email" className="text-slate-600 font-bold">
                    Email
                  </Label>
                  <Input
                    name="schoolEmail"
                    type="email"
                    placeholder="Enter the email"
                    pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                    title="write valid email"
                    value={schoolEmail}
                    onChange={(e) => setSchoolEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="my-1 flex flex-col">
                  <Label
                    htmlFor="image "
                    className="text-slate-600 font-bold my-1"
                  >
                    Image
                  </Label>
                  <lr-config
                    ctx-name="my-uploader"
                    pubkey="a8d36366e838702f2c5c"
                    max-local-file-size-bytes="10000000"
                    img-only="true"
                  />
                  <lr-file-uploader-regular
                    ctx-name="my-uploader"
                    css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.36.0/web/lr-file-uploader-regular.min.css`}
                  />
                  <lr-upload-ctx-provider
                    ctx-name="my-uploader"
                    ref={ctxProviderRef}
                  />
                  {/* <Input
                    name="schoolImage"
                    type="file"
                    placeholder="Enter the image"
                    onChange={handleFileChange}
                    required
                  /> */}
                  <p className="text-base lg:text-lg text-slate-500 font-bold">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
                <Button className="w-full mt-3" type="submit">
                  Save
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
