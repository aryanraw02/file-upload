import RecentUploadList from "@/components/RecentUploadList";

export default function UploadSlot() {
    return (
        <div>
            <h3 className="text-xl font-bold mb-4 text-text flex justify-center items-center">Recent Uploads</h3>
            <RecentUploadList />
        </div>
    );
}