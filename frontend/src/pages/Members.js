import React, { useState, useEffect } from 'react';
import { getMembers, createMember, updateMember, deleteMember } from '../services/api';

function Members() {
    const [members, setMembers] = useState([]);
    const [editingMember, setEditingMember] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
        phoneNumber: '',
        membershipDate: '',
    });

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        const response = await getMembers();
        setMembers(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingMember) {
            await updateMember(editingMember.member_id, formData);
        } else {
            await createMember(formData);
        }
        setFormData({
            name: '',
            address: '',
            email: '',
            phoneNumber: '',
            membershipDate: '',
        });
        setEditingMember(null);
        fetchMembers();
    };

    const handleEdit = (member) => {
        setEditingMember(member);
        setFormData({
            name: member.name,
            address: member.address,
            email: member.email,
            phoneNumber: member.phoneNumber,
            membershipDate: member.membershipDate,
        });
    };

    const handleDelete = async (id) => {
        await deleteMember(id);
        fetchMembers();
    };

    return (
        <div>
            <h2>Library Members</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
                <input
                    type="date"
                    value={formData.membershipDate}
                    onChange={(e) => setFormData({ ...formData, membershipDate: e.target.value })}
                />
                <button type="submit">{editingMember ? 'Update' : 'Add'} Member</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Membership Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member.member_id}>
                            <td>{member.name}</td>
                            <td>{member.address}</td>
                            <td>{member.email}</td>
                            <td>{member.phoneNumber}</td>
                            <td>{member.membershipDate}</td>
                            <td>
                                <button onClick={() => handleEdit(member)}>Edit</button>
                                <button onClick={() => handleDelete(member.member_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Members;