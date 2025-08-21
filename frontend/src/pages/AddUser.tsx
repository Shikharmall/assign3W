import { useState } from "react";
import { User, Trophy, Camera } from "lucide-react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import "../assets/AddUserPage.css";
import { addUserAPI } from "../api/UserAPI";
import type { AddUserScreenProps } from "../constant/types";

export default function AddUserScreen({ totalUsers, getAllUserDetailsFunc }: AddUserScreenProps) {
    const [name, setName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addUserFunc = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        await addUserAPI({ name });
        getAllUserDetailsFunc(1, 10);
        setName("");
        setIsLoading(false);
    };

    return (
        <div className="adduser-container">

            {/* Main Content */}
            <div className="main-content">
                {/* Decorative Elements */}
                <div className="decor decor1"></div>
                <div className="decor decor2"></div>
                <div className="decor decor3"></div>
                <div className="decor decor4"></div>

                {/* Form Card */}
                <div className="form-wrapper">
                    <Card className="form-card">
                        <CardHeader>
                            <CardTitle className="form-title">
                                <User className="icon orange" />
                                User Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="form" onSubmit={addUserFunc}>
                                {/* Avatar Upload */}
                                <div className="avatar-section">
                                    <div className="avatar-wrapper">
                                        <div className="avatar-circle">
                                            {/* {avatarPreview ? (
                                                <img src={avatarPreview} alt="Avatar preview" className="avatar-img" />
                                            ) : (
                                                <Camera className="icon gray" />
                                            )} */}
                                            <Camera className="icon gray" />
                                        </div>
                                    </div>
                                    <p className="avatar-hint">Tap to upload avatar</p>
                                </div>

                                {/* Name Input */}
                                <div className="input-group">
                                    <label htmlFor="name" className="input-label">
                                        <User className="icon small" /> User Name
                                    </label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Enter user name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="submit-wrapper">
                                    <Button
                                        type="submit"
                                        className="submit-btn"
                                        disabled={!name.trim()}
                                    >
                                        <Trophy className="icon small" />
                                        {isLoading ? "Adding..." : "Add User to Ranking"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Additional Info Card */}
                    <Card className="info-card">
                        <CardContent>
                            <div className="info-content">
                                <div className="info-icon">
                                    <Trophy className="icon small yellow" />
                                </div>
                                <div>
                                    <p className="info-title">New users start at position {totalUsers}+</p>
                                    <p className="info-subtitle">They can climb the rankings by earning points</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
