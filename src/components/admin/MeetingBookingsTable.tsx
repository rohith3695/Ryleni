import { useState, useEffect } from 'react';
import { Search, CalendarCheck, Trash2, User, Building2, Mail, Phone, MessageSquare, Filter } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, getDocs, deleteDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';

interface MeetingBooking {
    id: string;
    meetingType: string;
    meetingTypeId: string;
    date: string;
    dateTimestamp: Timestamp;
    time: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
    source: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    createdAt: Timestamp;
}

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
    pending: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Pending' },
    confirmed: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Confirmed' },
    completed: { bg: 'bg-green-50', text: 'text-green-700', label: 'Completed' },
    cancelled: { bg: 'bg-red-50', text: 'text-red-700', label: 'Cancelled' },
};

const MeetingBookingsTable = () => {
    const [bookings, setBookings] = useState<MeetingBooking[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "meeting-bookings"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const items: MeetingBooking[] = [];
            querySnapshot.forEach((docSnap) => {
                items.push({ id: docSnap.id, ...docSnap.data() } as MeetingBooking);
            });
            setBookings(items);
        } catch (error) {
            console.error("Error fetching meeting bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            await updateDoc(doc(db, "meeting-bookings", id), { status: newStatus });
            setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus as MeetingBooking['status'] } : b));
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status.");
        }
    };

    const handleDelete = async (id: string) => {
        const password = window.prompt("Enter admin password to delete this booking:");
        if (password === "reldel987") {
            if (window.confirm("Are you sure you want to delete this booking? This cannot be undone.")) {
                try {
                    await deleteDoc(doc(db, "meeting-bookings", id));
                    setBookings(bookings.filter(b => b.id !== id));
                    alert("Booking deleted successfully.");
                } catch (error) {
                    console.error("Error deleting booking:", error);
                    alert("Failed to delete booking.");
                }
            }
        } else if (password !== null) {
            alert("Incorrect password. Deletion cancelled.");
        }
    };

    const formatDate = (timestamp: Timestamp) => {
        if (!timestamp) return 'N/A';
        return new Date(timestamp.seconds * 1000).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredBookings = bookings.filter(b => {
        const matchesSearch =
            b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (b.company && b.company.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Stats
    const stats = {
        total: bookings.length,
        pending: bookings.filter(b => b.status === 'pending').length,
        confirmed: bookings.filter(b => b.status === 'confirmed').length,
        completed: bookings.filter(b => b.status === 'completed').length,
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <p className="text-sm text-gray-500 mb-1">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <p className="text-sm text-amber-600 mb-1">Pending</p>
                    <p className="text-2xl font-bold text-amber-700">{stats.pending}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <p className="text-sm text-blue-600 mb-1">Confirmed</p>
                    <p className="text-2xl font-bold text-blue-700">{stats.confirmed}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <p className="text-sm text-green-600 mb-1">Completed</p>
                    <p className="text-2xl font-bold text-green-700">{stats.completed}</p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Meeting Bookings</h2>
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        Showing: <span className="text-gray-900 font-bold">{filteredBookings.length}</span>
                    </span>
                </div>

                <div className="flex w-full md:w-auto flex-col sm:flex-row justify-between md:justify-end items-stretch sm:items-center gap-3">
                    <div className="relative w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search by name, email, company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full sm:w-72"
                        />
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>

                    <div className="flex gap-2">
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            <Filter className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>

                        <button
                            onClick={fetchBookings}
                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                            Refresh
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : filteredBookings.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CalendarCheck className="w-6 h-6 text-gray-400" />
                    </div>
                    <h3 className="text-gray-900 font-medium mb-1">No bookings found</h3>
                    <p className="text-gray-500 text-sm">
                        {searchTerm || statusFilter !== 'all' ? "Try adjusting your filters." : "Waiting for new meeting bookings."}
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-4">Client</th>
                                    <th className="px-6 py-4">Meeting</th>
                                    <th className="px-6 py-4">Date & Time</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Submitted</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredBookings.map((booking) => {
                                    const sc = statusColors[booking.status] || statusColors.pending;
                                    return (
                                        <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-0.5">
                                                    <div className="flex items-center gap-1.5">
                                                        <User className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                                        <span className="font-semibold text-gray-900 text-sm">{booking.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Mail className="w-3 h-3 text-gray-400 flex-shrink-0" />
                                                        <a href={`mailto:${booking.email}`} className="text-primary text-xs hover:underline">{booking.email}</a>
                                                    </div>
                                                    {booking.phone && (
                                                        <div className="flex items-center gap-1.5">
                                                            <Phone className="w-3 h-3 text-gray-400 flex-shrink-0" />
                                                            <span className="text-gray-500 text-xs">{booking.phone}</span>
                                                        </div>
                                                    )}
                                                    {booking.company && (
                                                        <div className="flex items-center gap-1.5">
                                                            <Building2 className="w-3 h-3 text-gray-400 flex-shrink-0" />
                                                            <span className="text-gray-500 text-xs">{booking.company}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-medium text-gray-900 text-sm">{booking.meetingType}</span>
                                                    {booking.message && (
                                                        <button
                                                            onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)}
                                                            className="inline-flex items-center gap-1 text-primary text-xs hover:underline mt-0.5 w-fit"
                                                        >
                                                            <MessageSquare className="w-3 h-3" />
                                                            {expandedId === booking.id ? 'Hide' : 'View'} Message
                                                        </button>
                                                    )}
                                                    {expandedId === booking.id && booking.message && (
                                                        <p className="text-xs text-gray-600 bg-gray-50 rounded-lg p-2 mt-1 max-w-xs">{booking.message}</p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-sm font-medium text-gray-900">{booking.date}</span>
                                                    <span className="text-xs text-gray-500">{booking.time} IST</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={booking.status}
                                                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                                    className={`${sc.bg} ${sc.text} px-2.5 py-1 rounded-lg text-xs font-semibold border-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20`}
                                                >
                                                    <option value="pending">⏳ Pending</option>
                                                    <option value="confirmed">✅ Confirmed</option>
                                                    <option value="completed">🎉 Completed</option>
                                                    <option value="cancelled">❌ Cancelled</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-xs text-gray-500">{formatDate(booking.createdAt)}</span>
                                                    {booking.source && (
                                                        <span className="text-xs text-gray-400">via {booking.source}</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDelete(booking.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete booking"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MeetingBookingsTable;
