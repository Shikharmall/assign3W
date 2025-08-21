// import { Tabs } from "@base-ui-components/react/tabs"
// import { ToggleGroup } from "@base-ui-components/react/toggle-group"
// import { Avatar } from "@base-ui-components/react/avatar"
import { addUserAPI, assignUserPointsAPI, getAllUsersDetailsAPI, } from "../api/UserAPI";
import type { User } from "../constant/types"
import { useEffect, useState } from "react"

// const topUsers = [
//     { id: 1, name: "RiMJiTiN💖RG", avatar: "/young-woman-dark-hair.png", points: "1,134,590", position: 2, crown: false },
//     { id: 2, name: "🔥PRITESH🔥", avatar: "/placeholder-ds6ux.png", points: "1,614,546", position: 1, crown: true },
//     { id: 3, name: "KRISHU RAJP...", avatar: "/white-fluffy-cat.png", points: "942,034", position: 3, crown: false },
// ]

// const rankedUsers = [
//     { id: 4, name: "THAKUR RAN VIJAY SINGH", avatar: "/man-with-mustache.png", points: "558,378", position: 4 },
//     { id: 5, name: "MUKKU🔥", avatar: "/young-man-dark-hair.png", points: "503,042", position: 5 },
//     { id: 6, name: "🇺🇸⚪VHD🍀🔥", avatar: "/person-with-cap.png", points: "352,250", position: 6 },
//     { id: 7, name: "°ᴸᵒᵛᵉᵧₒᵤ°", avatar: "/colorful-person.png", points: "346,392", position: 7 },
//     { id: 8, name: "MR.--RAJPUT---.🌍", avatar: "/bearded-man-portrait.png", points: "343,892", position: 8 },
//     { id: 9, name: "__Ishq__🖤👑", avatar: "/stylish-person.png", points: "321,932", position: 9 },
// ]

export default function RankingScreen() {
    // const tabs = ["Party Ranking", "Live Ranking", "Hourly Ranking", "Family Ranking"]
    // const rankingTypes = ["Weekly Contribution Ranking", "Weekly Charm Ranking"]

    const [users, setUsers] = useState<User[]>([]);
    const [name, setName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingTable, setIsLoadingTable] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [totalUsers, setTotalUsers] = useState<number>(0);

    const getAllUserDetailsFunc = async (page: number, limit: number) => {
        setIsLoadingTable(true);
        const usersData = await getAllUsersDetailsAPI(page, limit);
        setUsers(usersData?.data);
        setTotalUsers(usersData?.total);
        setIsLoadingTable(false);
    }

    const claimPointsFunc = async (userId: string) => {
        await assignUserPointsAPI(userId);
        setPage(1);
        getAllUserDetailsFunc(1, 10);
    }

    const addUserFunc = async () => {
        if (name === "") {
            alert("Name input is empty.");
            return;
        }
        setIsLoading(true);
        await addUserAPI({ name: name });
        getAllUserDetailsFunc(page, 10);
        setName("");
        setIsLoading(false);
    }

    useEffect(() => {
        if (page) {
            getAllUserDetailsFunc(page, 10);
        }
    }, [page]);

    return (
        <>
            {/* <div className="max-w-md mx-auto bg-white min-h-screen p-4 space-y-6">
 
            <Tabs.Root defaultValue="Party Ranking">
                <Tabs.List className="flex gap-4 border-b pb-2">
                    {tabs.map((tab) => (
                        <Tabs.Tab
                            key={tab}
                            value={tab}
                            className={({ selected }) =>
                                `text-sm pb-2 ${selected ? "font-bold text-orange-500 border-b-2 border-orange-500" : "text-gray-500"
                                }`
                            }
                        >
                            {tab}
                        </Tabs.Tab>
                    ))}
                </Tabs.List>

                {tabs.map((tab) => (
                    <Tabs.Content key={tab} value={tab} className="mt-4 space-y-6">
                   
                        <ToggleGroup.Root
                            type="single"
                            defaultValue="Weekly Contribution Ranking"
                            className="flex bg-gray-100 rounded-full p-1"
                        >
                            {rankingTypes.map((type) => (
                                <ToggleGroup.Item
                                    key={type}
                                    value={type}
                                    className={({ pressed }) =>
                                        `flex-1 py-2 px-3 rounded-full text-sm font-medium ${pressed ? "bg-white shadow text-gray-900" : "text-gray-500"
                                        }`
                                    }
                                >
                                    {type}
                                </ToggleGroup.Item>
                            ))}
                        </ToggleGroup.Root>

           
                        <div>
                            <h2 className="font-bold mb-2">Top 3</h2>
                            <div className="grid grid-cols-3 gap-2">
                                {topUsers.map((user) => (
                                    <div key={user.id} className="border rounded p-2 text-center">
                                        <Avatar.Root className="mx-auto mb-2">
                                            <Avatar.Image
                                                src={user.avatar}
                                                alt={user.name}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <Avatar.Fallback className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                                                {user.name[0]}
                                            </Avatar.Fallback>
                                        </Avatar.Root>
                                        <p className="text-sm font-medium truncate">{user.name}</p>
                                        <p className="text-xs text-gray-500">Pos {user.position}</p>
                                        <p className="font-bold">{user.points}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

       
                        <div>
                            <h2 className="font-bold mb-2">Others</h2>
                            <div className="space-y-2">
                                {rankedUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex justify-between items-center border rounded px-2 py-1"
                                    >
                                        <div className="flex gap-2 items-center">
                                            <span className="w-6 text-sm font-bold">{user.position}</span>
                                            <Avatar.Root>
                                                <Avatar.Image
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <Avatar.Fallback className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                                                    {user.name[0]}
                                                </Avatar.Fallback>
                                            </Avatar.Root>
                                            <span className="text-sm">{user.name}</span>
                                        </div>
                                        <span className="text-sm font-medium">{user.points}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

            
                        <div className="border rounded px-2 py-2 mt-4 flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <span className="text-sm font-bold text-gray-500">999+</span>
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                    D
                                </div>
                                <span className="text-sm">Devil</span>
                            </div>
                            <span className="text-sm font-medium">0</span>
                        </div>
                    </Tabs.Content>
                ))}
            </Tabs.Root>
        </div> */}
            <div>
                <input name="name" value={name} onChange={(e) => setName(e.target.value)} />
                <button onClick={addUserFunc}> {isLoading ? "Adding..." : "Add User"}</button>
            </div>

            {
                isLoadingTable
                    ?
                    <text>Loading...</text>
                    :
                    <>
                        {
                            users?.map((user, index) => (
                                <div key={index} style={{ margin: 5 }}>
                                    <text>{(page - 1) * 10 + (index + 1)}. </text>
                                    <text>{user?.name} ({user?.points?.reduce((acc, item) => acc + item, 0) || 0} points) {
                                        index + 1 === currentIndex ?
                                            <span onClick={() => setCurrentIndex(0)} style={{
                                                cursor: 'pointer',
                                                borderColor: 'red',
                                                borderWidth: 1,
                                                margin: 5
                                            }}>show less...</span>
                                            :
                                            <span onClick={() => setCurrentIndex(index + 1)} style={{
                                                cursor: 'pointer',
                                                borderColor: 'red',
                                                borderWidth: 1,
                                                margin: 5
                                            }}>show more...</span>
                                    } </text>
                                    {
                                        index + 1 === currentIndex && (
                                            <div style={{ flexDirection: 'column' }}>
                                                {
                                                    user?.points?.map((point, index) => (
                                                        <text key={index}>{point}</text>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                    <text></text>
                                    <button
                                        onClick={() =>
                                            // claimPointsFunc(user?._id)
                                            claimPointsFunc(user?._id as string)
                                        }
                                        style={{
                                            borderColor: 'red',
                                            borderWidth: 1
                                        }}

                                    >Claim Points</button>
                                </div>
                            ))
                        }
                        {
                            users?.length === 0 && (
                                <div>
                                    <text>No users found.</text>
                                </div>
                            )
                        }
                    </>
            }

            <button onClick={() => { setPage(page - 1) }} disabled={page === 1}>Previous</button><text>{page}</text> <button onClick={() => { setPage(page + 1) }} disabled={page === Math.floor(totalUsers / 10) + 1}>Next</button>
        </>
    )
}
