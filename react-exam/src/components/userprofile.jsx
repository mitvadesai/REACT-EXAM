import React from "react";
import { Container, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const UserProfile = () => {
    const { user } = useSelector(state => state.userReducer);

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <Card className="shadow-lg p-4 w-50">
                <Card.Body>
                    <div className="text-center">
                        <img
                            src={user?.profilePic || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}
                            alt="Profile"
                            className="rounded-circle mb-3 border border-primary p-2"
                            width="150"
                            height="150"
                        />
                        <h3>{user?.name || "User Name"}</h3>
                        <p className="text-muted">EMAIL : {user?.email || "example@gmail.com"}</p>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UserProfile;
