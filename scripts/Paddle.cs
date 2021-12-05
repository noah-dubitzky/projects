using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class Paddle : MonoBehaviour
{
    Rigidbody rigidbody;

    [SerializeField]
    private int score = 0;
    
    public int Accessible_Score
    {
        get { return score; }

        set { score = value; }
    }
    [SerializeField]
    private float speed = 3f;

    [SerializeField]
    private string up, down;

    public Paddle()
    {
        Accessible_Score = score;
    }

    // Start is called before the first frame update
    void Start()
    {
        rigidbody = GetComponent<Rigidbody>();   
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    void FixedUpdate()
    {
        if (Input.GetKey(up))
        {
            rigidbody.MovePosition(transform.position + Vector3.down * (-speed) * Time.deltaTime);
        }
        else if (Input.GetKey(down))
        {
            rigidbody.MovePosition(transform.position + Vector3.down * speed * Time.deltaTime);
        }
    }
}
