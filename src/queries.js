module.exports = {
    getClient: `select c.id, c.client, s.id as sid, s.subclient
                from clients c
                inner join subclients s
                on s.client_id = c.id
                and s.id in (:id, (select sister_subclient_id
                                    from subclients where id = :id))`
}