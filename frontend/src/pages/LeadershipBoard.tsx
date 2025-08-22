import { useEffect, useState } from "react"
import { Trophy, Gift } from "lucide-react"
import { Button } from "../components/Button"
import "../assets/RankingPage.css"
import AddUserScreen from "./AddUser"
import type { IUser, UserData } from "../constant/types"
import { assignUserPointsAPI, getAllUsersDetailsAPI } from "../api/UserAPI"

export default function RankingScreen() {
    const [activeTab, setActiveTab] = useState("Leadership Board");
    const tabs = ["Leadership Board", "Add User"];
    const [users, setUsers] = useState<IUser[]>([]);
    const [usersTopThree, setUsersTopThree] = useState<IUser[]>([]);
    const [isLoadingTable, setIsLoadingTable] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [totalUsers, setTotalUsers] = useState<number>(0);

    const getAllUserDetailsFunc = async (page: number, limit: number) => {
        setIsLoadingTable(true);
        const usersData: UserData = await getAllUsersDetailsAPI(page, limit);
        if (usersData?.status === 200) {
            setUsers(usersData?.data);
            setTotalUsers(usersData?.total);
            setUsersTopThree(usersData?.userTopThree);
        }
        setIsLoadingTable(false);
    }

    const claimPointsFunc = async (userId: string) => {
        await assignUserPointsAPI(userId);
        setPage(1);
        getAllUserDetailsFunc(1, 10);
    }

    useEffect(() => {
        if (page) {
            getAllUserDetailsFunc(page, 10);
        }
    }, [page]);

    return (
        <div style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(to bottom, #fb923c, #f97316)',
            width: '100vw',
            height: '100%'
        }}>
            <div className="ranking-container">

                {/* Header Navigation */}
                <div className="header-nav">
                    <div className="tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {
                    activeTab === tabs[0] && (
                        <>

                            {/* Main Ranking Section */}
                            <div className="ranking-section">
                                {/* Decorative Elements */}
                                <div className="decor yellow-300" style={{ top: "16px", left: "16px", width: "24px", height: "24px" }}></div>
                                <div className="decor yellow-400" style={{ top: "32px", right: "32px", width: "16px", height: "16px" }}></div>
                                <div className="decor yellow-300" style={{ bottom: "48px", left: "32px", width: "20px", height: "20px" }}></div>
                                <div className="decor yellow-400" style={{ bottom: "32px", right: "16px", width: "24px", height: "24px" }}></div>

                                {/* Settlement Info */}
                                <div className="settlement">
                                    <span></span>
                                    <Button className="rewards-btn">
                                        <Gift className="icon" /> Rewards
                                    </Button>
                                </div>

                                {/* Trophy */}
                                <div className="trophy-container">
                                    <Trophy size={64} color="#fde047" />
                                </div>

                                {/* Top 3 Podium */}
                                <div className="podium">
                                    <div className="podium-card">
                                        <div className="podium-users">
                                            {usersTopThree.map((user, index) => (
                                                <div key={user._id} className="podium-user">
                                                    <div className="user-avatar-wrapper">
                                                        <img src={'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/young-woman-dark-hair-GXxiUY1an9Us8lytOYljuCsDg7lGjc.png'} alt={user.name} className="user-avatar" />
                                                        {index === 0 && <div className="crown">👑</div>}
                                                        <div className="position-badge">{index + 1}</div>
                                                    </div>
                                                    <p className="user-name">{user.name}</p>
                                                    <div className="user-points">
                                                        <Trophy size={16} color="#facc15" />
                                                        <span>{user?.points?.reduce((acc, item) => acc + item, 0) || 0}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Ranked List */}
                            <div className="ranked-list">
                                {
                                    isLoadingTable ?
                                        <center>
                                            <span className="ranked-name">Loading...</span>
                                        </center>
                                        :

                                        <>
                                            {
                                                users?.map((user, index) => (
                                                    <div key={user._id} className="ranked-user">
                                                        <div className="ranked-left">
                                                            {
                                                                page === 1
                                                                    ?
                                                                    <span className="ranked-pos">{((page - 1) * 10) + index + 4}</span>
                                                                    :
                                                                    <span className="ranked-pos">{((page - 1) * 10) + index + 1}</span>
                                                            }
                                                            <img src={'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/young-woman-dark-hair-GXxiUY1an9Us8lytOYljuCsDg7lGjc.png'} alt={user?.name} className="ranked-avatar" />
                                                            <span className="ranked-name">{user?.name}</span>
                                                        </div>
                                                        <div className="ranked-right">
                                                            <span>{user?.points?.reduce((acc, item) => acc + item, 0) || 0} points</span>
                                                            <Trophy size={20} color="#facc15" />
                                                            <button
                                                                onClick={() =>
                                                                    claimPointsFunc(user?._id as string)
                                                                }
                                                                style={{
                                                                    borderColor: 'red',
                                                                    borderWidth: 1,
                                                                    fontSize: 10,
                                                                    color: '#f97316',
                                                                    //scale: 3
                                                                }}
                                                            >Claim Points</button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </>

                                }
                                {!isLoadingTable && users?.length === 0 && (
                                    <center>
                                        <span className="ranked-name">No users.</span>
                                    </center>
                                )}


                                {/* Current User */}
                                <div className="current-user">
                                    <div className="current-left">
                                        <button onClick={() => { setPage(page - 1) }} disabled={page <= 1}>Previous</button>
                                        <p>{page} of {Math.ceil(totalUsers / 10)}</p>
                                        <button onClick={() => { setPage(page + 1) }} disabled={page >= Math.ceil(totalUsers / 10)}>Next</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }

                {
                    activeTab === tabs[1] && (
                        <AddUserScreen totalUsers={totalUsers} getAllUserDetailsFunc={getAllUserDetailsFunc} />
                    )
                }

            </div>

        </div >
    )
}
